import { useConnectWithOtp } from "@dynamic-labs/sdk-react-core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginFormContext } from "./LoginFormContext";
import { useDispatch } from "react-redux";
import { HistorySlice } from "../../store/slices";

interface OTPFields {
	otp: string;
}

const otpFieldsSchema = z.object({
	otp: z.string().min(1, "OTP is required"),
});

const initialOTPFields: OTPFields = {
	otp: "",
};

export const LoginFormOTP: React.FC = () => {
	const { step, setStep } = useContext(LoginFormContext);
	const dispatch = useDispatch();

	const { verifyOneTimePassword } = useConnectWithOtp();
	const onSubmitHandler = useCallback(
		async (data: OTPFields) => {
			await verifyOneTimePassword(data.otp);
			dispatch(HistorySlice.actions.clear());
		},
		[verifyOneTimePassword, dispatch]
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<OTPFields>({
		resolver: zodResolver(otpFieldsSchema),
		defaultValues: initialOTPFields,
	});

	if (step !== 2) {
		return null;
	}

	return (
		<form key="otp-form" onSubmit={handleSubmit(onSubmitHandler)} className="login-form">
			<div className="login-form-group">
				<label htmlFor="otp" className="login-form-label">
					Verification Code
				</label>
				<input
					id="otp"
					type="text"
					{...register("otp")}
					placeholder="Enter 6-digit code"
					className={`login-form-input ${errors.otp ? "error" : ""}`}
				/>
				{errors.otp && (
					<p className="login-form-error">
						⚠️ {errors.otp.message}
					</p>
				)}
			</div>
			<div className="login-form-button-group">
				<button
					type="button"
					className="login-form-button login-form-button-secondary"
					onClick={() => setStep(1)}
				>
					← Back
				</button>
				<button type="submit" className="login-form-button login-form-button-primary">
					Verify & Login
				</button>
			</div>
		</form>
	);
};
