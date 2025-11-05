import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Pages from "./Pages";
import { GuardAuth } from "./components/GuardAuth";

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Pages.Home />} />
				<Route path="/login" element={<Pages.Login />} />
				<Route
					path="/dashboard"
					element={
						<GuardAuth>
							<Pages.Dashboard />
						</GuardAuth>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
