import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { LoginFormEmail } from "./LoginFormEmail";
import { LoginFormOTP } from "./LoginFormOTP";
import { LoginFormProvider, LoginFormContext } from "./LoginFormContext";
import { useContext } from "react";
import "./LoginForm.css";

const LoginFormContent: React.FC = () => {
	const { user } = useDynamicContext();
	const { step } = useContext(LoginFormContext);

	return (
		<div className="login-form-container">
			<div className="login-form-wrapper">
				<h2 className="login-form-title">Welcome Back</h2>
				<p className="login-form-subtitle">
					{step === 1 ? "Enter your email to continue" : "Enter the code sent to your email"}
				</p>

				<div className="login-form-step-indicator">
					<div className={`login-form-step-dot ${step === 1 ? "active" : ""}`}></div>
					<div className={`login-form-step-dot ${step === 2 ? "active" : ""}`}></div>
				</div>

				<LoginFormEmail />
				<LoginFormOTP />

				{!!user && (
					<div className="login-form-user-info">
						<p className="login-form-user-info-title">Authenticated User</p>
						<pre className="login-form-user-info-content">
							{JSON.stringify(user, null, 2)}
						</pre>
					</div>
				)}
			</div>
		</div>
	);
};

export const LoginForm: React.FC = () => {
	return (
		<LoginFormProvider>
			<LoginFormContent />
		</LoginFormProvider>
	);
};
