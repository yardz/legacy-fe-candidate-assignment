import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import { Loading } from "../Loading";

export function GuardAuth({ children }: { children: React.ReactNode }) {
	const isAuthenticated = useIsAuthenticated();

	if (isAuthenticated === "loading") {
		return <Loading />;
	}

	if (isAuthenticated === "unauthenticated") {
		return <Navigate to="/login" />;
	}

	return children;
}
