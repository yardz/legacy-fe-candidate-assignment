import { useConnectWithOtp } from "@dynamic-labs/sdk-react-core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginFormContext } from "./LoginFormContext";

interface LoginFields {
	email: string;
}

const loginFieldsSchema = z.object({
	email: z.string().email(),
});

const initialLoginFields: LoginFields = {
	email: "",
};

export const LoginFormEmail: React.FC = () => {
	const { connectWithEmail } = useConnectWithOtp();
	const { setStep, step } = useContext(LoginFormContext);

	const onSubmitHandler = useCallback(
		async (data: LoginFields) => {
			await connectWithEmail(data.email);
			setStep(2);
		},
		[connectWithEmail, setStep]
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFields>({
		resolver: zodResolver(loginFieldsSchema),
		defaultValues: initialLoginFields,
	});

	if (step !== 1) {
		return null;
	}

	return (
		<form key="email-form" onSubmit={handleSubmit(onSubmitHandler)} className="login-form">
			<div className="login-form-group">
				<label htmlFor="email" className="login-form-label">
					Email Address
				</label>
				<input
					id="email"
					type="email"
					{...register("email")}
					placeholder="your.email@example.com"
					className={`login-form-input ${errors.email ? "error" : ""}`}
				/>
				{errors.email && (
					<p className="login-form-error">
						⚠️ {errors.email.message}
					</p>
				)}
			</div>
			<button type="submit" className="login-form-button login-form-button-primary">
				Get Verification Code
			</button>
		</form>
	);
};
