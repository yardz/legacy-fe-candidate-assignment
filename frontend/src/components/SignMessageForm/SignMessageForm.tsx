import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { HistorySlice } from "../../store/slices";
import { toast } from "react-toastify";
import { validateSign } from "../../services/validateSign";
import "./SignMessageForm.css";

const signMessageSchema = z.object({
	message: z.string().min(1, "Message is required"),
});

type SignMessageFormData = z.infer<typeof signMessageSchema>;

export function SignMessageForm() {
	const { primaryWallet } = useDynamicContext();
	const dispatch = useDispatch();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm<SignMessageFormData>({
		resolver: zodResolver(signMessageSchema),
	});

	const messageValue = watch("message", "");

	const onSubmit = useCallback(
		async (data: SignMessageFormData) => {
			console.log(data.message);
			if (!primaryWallet) {
				throw new Error("Primary wallet not found");
			}
			
			setIsSubmitting(true);
			let signature: string | undefined;
			try {
				signature = await primaryWallet.signMessage(data.message);
			} catch {
				toast.error("Failed to sign message");
				setIsSubmitting(false);
				return;
			}
			if (!signature) {
				toast.error("Failed to sign message");
				setIsSubmitting(false);
				return;
			}

			try {
				const result = await validateSign({
					message: data.message,
					signature,
				});
				if (!result.isValid && result.signer !== primaryWallet.address) {
					toast.error("Failed to validate signature");
					setIsSubmitting(false);
					return;
				}
				toast.success("Message signed successfully");
				dispatch(
					HistorySlice.actions.add({
						message: data.message,
						signature,
						signer: primaryWallet.address,
						verified: result.isValid,
					})
				);
				reset();
			} catch {
				toast.error("Failed to validate signature");
				return;
			} finally {
				setIsSubmitting(false);
			}
		},
		[dispatch, primaryWallet, reset]
	);

	return (
		<div className="sign-message-container">
			<div className="sign-message-wrapper">
				<div className="sign-message-header">
					<div className="sign-message-icon">🔐</div>
					<h2 className="sign-message-title">Sign Message</h2>
					<p className="sign-message-subtitle">
						Create a cryptographic signature using your wallet to verify ownership
					</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="sign-message-form">
					<div className="sign-message-form-group">
						<label htmlFor="message" className="sign-message-label">
							Your Message
						</label>
						<textarea
							id="message"
							{...register("message")}
							placeholder="Enter your message to sign..."
							rows={5}
							className={`sign-message-textarea ${errors.message ? "error" : ""}`}
							disabled={isSubmitting}
						/>
						{messageValue && (
							<div className="sign-message-counter">
								{messageValue.length} characters
							</div>
						)}
						{errors.message && (
							<div className="sign-message-error">
								{errors.message.message}
							</div>
						)}
					</div>

					<div className="sign-message-info">
						<p className="sign-message-info-text">
							Signing a message proves you own the private key without revealing it. 
							The signature will be verified on the blockchain.
						</p>
					</div>

					<button
						type="submit"
						className={`sign-message-button ${isSubmitting ? "loading" : ""}`}
						disabled={isSubmitting}
					>
						<span className="sign-message-button-content">
							{isSubmitting ? "Signing..." : "Sign Message"}
						</span>
					</button>

					<div className="sign-message-security">
						<span className="sign-message-security-icon">🔒</span>
						<span className="sign-message-security-text">
							Secured by blockchain cryptography
						</span>
					</div>
				</form>
			</div>
		</div>
	);
}
