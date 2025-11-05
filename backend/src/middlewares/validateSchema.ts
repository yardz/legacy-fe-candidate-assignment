import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";

export const validateSchema = (schema: ZodSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const validatedData = schema.parse(req.body);
			req.body = validatedData;
			next();
		} catch (error: unknown) {
			if (error instanceof z.ZodError) {
				return res.status(400).json({
					success: false,
					message: "Validation error",
					errors: error.errors,
				});
			}

			res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	};
};
