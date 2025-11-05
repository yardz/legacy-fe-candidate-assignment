import { Request, Response, NextFunction } from "express";
import { z, ZodError, ZodSchema } from "zod";
import { validateSchema } from "./validateSchema";

describe("validateSchema", () => {
	let mockRequest: Partial<Request>;
	let mockResponse: Partial<Response>;
	let mockNext: NextFunction;

	beforeEach(() => {
		mockRequest = {
			body: {},
		};
		mockResponse = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis(),
		};
		mockNext = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should validate request body successfully and call next()", () => {
		// Arrange
		const schema = z.object({
			email: z.string().email(),
			password: z.string().min(6),
		});

		const validData = {
			email: "test@example.com",
			password: "password123",
		};

		mockRequest.body = validData;

		const middleware = validateSchema(schema);

		// Act
		middleware(mockRequest as Request, mockResponse as Response, mockNext);

		// Assert
		expect(mockRequest.body).toEqual(validData);
		expect(mockNext).toHaveBeenCalledTimes(1);
		expect(mockResponse.status).not.toHaveBeenCalled();
		expect(mockResponse.json).not.toHaveBeenCalled();
	});

	it("should transform and validate data according to schema", () => {
		// Arrange
		const schema = z.object({
			age: z.string().transform((val) => parseInt(val, 10)),
			name: z.string(),
		});

		mockRequest.body = {
			age: "25",
			name: "John Doe",
		};

		const middleware = validateSchema(schema);

		// Act
		middleware(mockRequest as Request, mockResponse as Response, mockNext);

		// Assert
		expect(mockRequest.body).toEqual({
			age: 25,
			name: "John Doe",
		});
		expect(mockNext).toHaveBeenCalledTimes(1);
	});

	it("should return 400 error when validation fails with ZodError", () => {
		// Arrange
		const schema = z.object({
			email: z.string().email(),
			password: z.string().min(6),
		});

		mockRequest.body = {
			email: "invalid-email",
			password: "123",
		};

		const middleware = validateSchema(schema);

		// Act
		middleware(mockRequest as Request, mockResponse as Response, mockNext);

		// Assert
		expect(mockResponse.status).toHaveBeenCalledWith(400);
		expect(mockResponse.json).toHaveBeenCalledWith({
			success: false,
			message: "Validation error",
			errors: expect.any(Array),
		});
		expect(mockNext).not.toHaveBeenCalled();
	});

	it("should include detailed error information in response", () => {
		// Arrange
		const schema = z.object({
			email: z.string().email(),
		});

		mockRequest.body = {
			email: "not-an-email",
		};

		const middleware = validateSchema(schema);

		// Act
		middleware(mockRequest as Request, mockResponse as Response, mockNext);

		// Assert
		expect(mockResponse.json).toHaveBeenCalledWith({
			success: false,
			message: "Validation error",
			errors: expect.arrayContaining([
				expect.objectContaining({
					code: expect.any(String),
					path: expect.any(Array),
					message: expect.any(String),
				}),
			]),
		});
	});

	it("should handle missing required fields", () => {
		// Arrange
		const schema = z.object({
			username: z.string(),
			email: z.string().email(),
		});

		mockRequest.body = {
			username: "testuser",
			// email is missing
		};

		const middleware = validateSchema(schema);

		// Act
		middleware(mockRequest as Request, mockResponse as Response, mockNext);

		// Assert
		expect(mockResponse.status).toHaveBeenCalledWith(400);
		expect(mockResponse.json).toHaveBeenCalledWith({
			success: false,
			message: "Validation error",
			errors: expect.any(Array),
		});
		expect(mockNext).not.toHaveBeenCalled();
	});

	it("should handle empty request body", () => {
		// Arrange
		const schema = z.object({
			name: z.string(),
		});

		mockRequest.body = {};

		const middleware = validateSchema(schema);

		// Act
		middleware(mockRequest as Request, mockResponse as Response, mockNext);

		// Assert
		expect(mockResponse.status).toHaveBeenCalledWith(400);
		expect(mockResponse.json).toHaveBeenCalledWith({
			success: false,
			message: "Validation error",
			errors: expect.any(Array),
		});
	});

	it("should return 500 error when a non-ZodError is thrown", () => {
		// Arrange
		const schema = {
			parse: jest.fn().mockImplementation(() => {
				throw new Error("Unexpected error");
			}),
		} as unknown as ZodSchema;

		mockRequest.body = { test: "data" };

		const middleware = validateSchema(schema);

		// Act
		middleware(mockRequest as Request, mockResponse as Response, mockNext);

		// Assert
		expect(mockResponse.status).toHaveBeenCalledWith(500);
		expect(mockResponse.json).toHaveBeenCalledWith({
			success: false,
			message: "Internal server error",
		});
		expect(mockNext).not.toHaveBeenCalled();
	});

	it("should handle complex nested schema validation", () => {
		// Arrange
		const schema = z.object({
			user: z.object({
				name: z.string(),
				email: z.string().email(),
			}),
			metadata: z.object({
				timestamp: z.number(),
			}),
		});

		mockRequest.body = {
			user: {
				name: "John Doe",
				email: "john@example.com",
			},
			metadata: {
				timestamp: 1234567890,
			},
		};

		const middleware = validateSchema(schema);

		// Act
		middleware(mockRequest as Request, mockResponse as Response, mockNext);

		// Assert
		expect(mockNext).toHaveBeenCalledTimes(1);
		expect(mockRequest.body).toEqual({
			user: {
				name: "John Doe",
				email: "john@example.com",
			},
			metadata: {
				timestamp: 1234567890,
			},
		});
	});

	it("should handle optional fields correctly", () => {
		// Arrange
		const schema = z.object({
			required: z.string(),
			optional: z.string().optional(),
		});

		mockRequest.body = {
			required: "value",
		};

		const middleware = validateSchema(schema);

		// Act
		middleware(mockRequest as Request, mockResponse as Response, mockNext);

		// Assert
		expect(mockNext).toHaveBeenCalledTimes(1);
		expect(mockRequest.body).toEqual({
			required: "value",
		});
	});

	it("should strip unknown fields when using strict schema", () => {
		// Arrange
		const schema = z.object({
			name: z.string(),
		});

		mockRequest.body = {
			name: "John",
			unknownField: "should be removed",
		};

		const middleware = validateSchema(schema);

		// Act
		middleware(mockRequest as Request, mockResponse as Response, mockNext);

		// Assert
		expect(mockNext).toHaveBeenCalledTimes(1);
		expect(mockRequest.body).toEqual({
			name: "John",
		});
		expect(mockRequest.body).not.toHaveProperty("unknownField");
	});
});
