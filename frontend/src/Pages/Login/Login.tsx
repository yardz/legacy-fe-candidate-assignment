import { Link, Navigate } from "react-router-dom";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import { Loading } from "../../components/Loading";
import { LoginForm } from "../../components/LoginForm";

export function Login() {
	const isAuthenticated = useIsAuthenticated();

	if (isAuthenticated === "authenticated") {
		return <Navigate to="/dashboard" />;
	}

	if (isAuthenticated === "loading") {
		return <Loading />;
	}

	return (
		<div style={{ padding: "2rem", textAlign: "center" }}>
			<h1>Login Page</h1>
			<p>This is the login page for authentication.</p>
			<div style={{ marginTop: "2rem" }}>
				<LoginForm />
			</div>
			<div style={{ marginTop: "2rem" }}>
				<Link to="/" style={{ color: "#007bff", textDecoration: "none" }}>
					← Back to Home
				</Link>
			</div>
		</div>
	);
}
