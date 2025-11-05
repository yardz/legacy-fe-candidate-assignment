import { z } from "zod";

export const verifySignatureSchema = z.object({
	message: z.string(),
	signature: z.string(),
});

export type VerifySignatureRequest = z.infer<typeof verifySignatureSchema>;

