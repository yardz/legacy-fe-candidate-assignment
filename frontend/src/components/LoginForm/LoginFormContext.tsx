import { createContext } from "react";
import { useState } from "react";

export const LoginFormContext = createContext<{
	step: number;
	setStep: (step: number) => void;
}>({ step: 1, setStep: () => {} });

export const LoginFormProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [step, setStep] = useState<number>(1);
	return (
		<LoginFormContext.Provider value={{ step, setStep }}>
			{children}
		</LoginFormContext.Provider>
	);
};
