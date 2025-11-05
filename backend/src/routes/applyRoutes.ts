import { Express } from "express";
import {
	verifySignatureController,
	verifySignatureSchema,
} from "./verify-signature";
import { validateSchema } from "../middlewares/validateSchema";

export const applyRoutes = (app: Express) => {
	app.post(
		"/verify-signature",
		validateSchema(verifySignatureSchema),
		verifySignatureController
	);
};
