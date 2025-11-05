import { useState } from "react";
import { copyToClipboard } from "../../../utils/copyToClipboard";

interface UserInfoCardProps {
	userName: string;
	walletAddress: string | undefined;
	connectorName: string | undefined;
	userEmail: string | undefined;
}

export function UserInfoCard({
	userName,
	walletAddress,
	connectorName,
	userEmail,
}: UserInfoCardProps) {
	const [copiedAddress, setCopiedAddress] = useState(false);

	const formatAddress = (address: string | undefined) => {
		if (!address) return "N/A";
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	const handleCopyAddress = async (text: string) => {
		const success = await copyToClipboard(text, "Address copied to clipboard!");
		if (success) {
			setCopiedAddress(true);
			setTimeout(() => setCopiedAddress(false), 2000);
		}
	};

	return (
		<div className="user-info-card">
			<div className="user-info-content">
				<div className="user-info-header">
					<div className="user-avatar">👤</div>
					<div className="user-info-details">
						<h2 className="user-name">{userName}</h2>
						<div className="user-status">
							<span className="status-dot"></span>
							Connected
						</div>
					</div>
				</div>

				<div className="wallet-info-grid">
					<div className="wallet-info-item">
						<div className="wallet-info-label">
							<span className="wallet-info-label-icon">💳</span>
							Wallet Address
						</div>
						<div className="wallet-address-container">
							<div className="wallet-info-value">
								{formatAddress(walletAddress)}
							</div>
							<button
								className={`copy-button ${copiedAddress ? "copied" : ""}`}
								onClick={() =>
									walletAddress && handleCopyAddress(walletAddress)
								}
								title="Copy full address"
							>
								{copiedAddress ? "✓" : "📋"}
							</button>
						</div>
					</div>

					<div className="wallet-info-item">
						<div className="wallet-info-label">
							<span className="wallet-info-label-icon">🔗</span>
							Network
						</div>
						<div className="wallet-info-value">
							{connectorName || "Unknown"}
						</div>
					</div>

					<div className="wallet-info-item">
						<div className="wallet-info-label">
							<span className="wallet-info-label-icon">📧</span>
							Email
						</div>
						<div className="wallet-info-value">
							{userEmail || "Not provided"}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
