import { getVerifiedAddress } from "./verifyMessage";
import { verifyMessage, getAddress } from "ethers";

// Mock the ethers module
jest.mock("ethers", () => ({
	verifyMessage: jest.fn(),
	getAddress: jest.fn(),
}));

describe("getVerifiedAddress", () => {
	const mockVerifyMessage = verifyMessage as jest.MockedFunction<
		typeof verifyMessage
	>;
	const mockGetAddress = getAddress as jest.MockedFunction<typeof getAddress>;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should return the verified and checksummed address when signature is valid", () => {
		// Arrange
		const message = "Hello, Ethereum!";
		const signature = "0x1234567890abcdef";
		const verifiedAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
		const checksummedAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

		mockVerifyMessage.mockReturnValue(verifiedAddress);
		mockGetAddress.mockReturnValue(checksummedAddress);

		// Act
		const result = getVerifiedAddress(message, signature);

		// Assert
		expect(mockVerifyMessage).toHaveBeenCalledWith(message, signature);
		expect(mockVerifyMessage).toHaveBeenCalledTimes(1);
		expect(mockGetAddress).toHaveBeenCalledWith(verifiedAddress);
		expect(mockGetAddress).toHaveBeenCalledTimes(1);
		expect(result).toBe(checksummedAddress);
	});

	it("should handle different message and signature combinations", () => {
		// Arrange
		const message = "Sign this message";
		const signature = "0xabcdef1234567890";
		const verifiedAddress = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";
		const checksummedAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

		mockVerifyMessage.mockReturnValue(verifiedAddress);
		mockGetAddress.mockReturnValue(checksummedAddress);

		// Act
		const result = getVerifiedAddress(message, signature);

		// Assert
		expect(mockVerifyMessage).toHaveBeenCalledWith(message, signature);
		expect(mockGetAddress).toHaveBeenCalledWith(verifiedAddress);
		expect(result).toBe(checksummedAddress);
	});

	it("should throw an error when verifyMessage throws", () => {
		// Arrange
		const message = "Invalid message";
		const signature = "0xinvalid";
		const error = new Error("Invalid signature");

		mockVerifyMessage.mockImplementation(() => {
			throw error;
		});

		// Act & Assert
		expect(() => getVerifiedAddress(message, signature)).toThrow(
			"Invalid signature"
		);
		expect(mockVerifyMessage).toHaveBeenCalledWith(message, signature);
	});

	it("should throw an error when getAddress throws", () => {
		// Arrange
		const message = "Valid message";
		const signature = "0xvalid";
		const verifiedAddress = "invalid-address";
		const error = new Error("Invalid address");

		mockVerifyMessage.mockReturnValue(verifiedAddress);
		mockGetAddress.mockImplementation(() => {
			throw error;
		});

		// Act & Assert
		expect(() => getVerifiedAddress(message, signature)).toThrow(
			"Invalid address"
		);
		expect(mockVerifyMessage).toHaveBeenCalledWith(message, signature);
		expect(mockGetAddress).toHaveBeenCalledWith(verifiedAddress);
	});

	it("should handle empty message", () => {
		// Arrange
		const message = "";
		const signature = "0x1234567890abcdef";
		const verifiedAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
		const checksummedAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

		mockVerifyMessage.mockReturnValue(verifiedAddress);
		mockGetAddress.mockReturnValue(checksummedAddress);

		// Act
		const result = getVerifiedAddress(message, signature);

		// Assert
		expect(mockVerifyMessage).toHaveBeenCalledWith(message, signature);
		expect(result).toBe(checksummedAddress);
	});

	it("should properly chain the ethers functions", () => {
		// Arrange
		const message = "Test message";
		const signature = "0xtest";
		const verifiedAddress = "0x1234567890123456789012345678901234567890";
		const checksummedAddress = "0x1234567890123456789012345678901234567890";

		mockVerifyMessage.mockReturnValue(verifiedAddress);
		mockGetAddress.mockReturnValue(checksummedAddress);

		// Act
		getVerifiedAddress(message, signature);

		// Assert
		// Verify that getAddress receives the output from verifyMessage
		expect(mockGetAddress).toHaveBeenCalledWith(
			mockVerifyMessage.mock.results[0].value
		);
	});
});
