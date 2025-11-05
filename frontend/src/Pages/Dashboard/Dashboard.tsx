import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HistoryTable } from "../../components/HistoryTable";
import { SignMessageForm } from "../../components/SignMessageForm";
import { HistorySlice } from "../../store/slices/HistorySlice";
import { DashboardHeader, UserInfoCard, StatsGrid } from "./components";
import "./Dashboard.css";

export function Dashboard() {
	const { handleLogOut, primaryWallet, user } = useDynamicContext();
	const history = useSelector(
		HistorySlice.selectors.selectHistory,
		shallowEqual
	);

	const totalSigned = history.length;
	const verifiedSigned = history.filter((item) => item.verified).length;
	const successRate =
		totalSigned > 0 ? Math.round((verifiedSigned / totalSigned) * 100) : 0;

	return (
		<div className="dashboard-container">
			<DashboardHeader />

			<UserInfoCard
				userName={user?.email || user?.username || "Web3 User"}
				walletAddress={primaryWallet?.address}
				connectorName={primaryWallet?.connector?.name}
				userEmail={user?.email}
			/>

			<StatsGrid
				totalSigned={totalSigned}
				verifiedSigned={verifiedSigned}
				successRate={successRate}
			/>

			{/* Main Content */}
			<div className="dashboard-content">
				<SignMessageForm />
				<HistoryTable />
			</div>

			{/* Action Buttons */}
			<div className="dashboard-actions">
				<Link to="/" className="dashboard-button dashboard-button-secondary">
					<span className="dashboard-button-icon">←</span>
					<span className="dashboard-button-text">Back to Home</span>
				</Link>
				<button
					onClick={() => handleLogOut()}
					className="dashboard-button dashboard-button-danger"
				>
					<span className="dashboard-button-icon">🚪</span>
					<span className="dashboard-button-text">Logout</span>
				</button>
			</div>
		</div>
	);
}
