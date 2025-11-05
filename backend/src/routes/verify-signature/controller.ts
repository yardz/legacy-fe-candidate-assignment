import { Request, Response } from "express";
import { VerifySignatureRequest } from "./schema";
import { getVerifiedAddress } from "../../utils/verifyMessage";

export const verifySignatureController = (req: Request, res: Response) => {
	// Validation is already done by middleware
	const { message, signature } = req.body as VerifySignatureRequest;
	const verifiedAddress = getVerifiedAddress(message, signature);

	res.json({
		isValid: true,
		signer: verifiedAddress,
		originalMessage: message,
	});
};
