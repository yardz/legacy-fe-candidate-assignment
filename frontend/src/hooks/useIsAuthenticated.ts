import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

type AuthState = "authenticated" | "unauthenticated" | "loading";

export const useIsAuthenticated = (): AuthState => {
	const { user } = useDynamicContext();

	if (user) {
		return "authenticated";
	}

	return "unauthenticated";
};
