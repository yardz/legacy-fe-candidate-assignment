import { verifyMessage, getAddress } from "ethers";

export const getVerifiedAddress = (message: string, signature: string) => {
	const verifiedAddress = verifyMessage(message, signature);
	return getAddress(verifiedAddress);
};
