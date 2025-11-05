interface StatsGridProps {
	totalSigned: number;
	verifiedSigned: number;
	successRate: number;
}

export function StatsGrid({
	totalSigned,
	verifiedSigned,
	successRate,
}: StatsGridProps) {
	return (
		<div className="stats-grid">
			<div className="stat-card">
				<div className="stat-icon">📝</div>
				<div className="stat-value">{totalSigned}</div>
				<div className="stat-label">Total Signatures</div>
			</div>

			<div className="stat-card">
				<div className="stat-icon">✅</div>
				<div className="stat-value">{verifiedSigned}</div>
				<div className="stat-label">Verified</div>
			</div>

			<div className="stat-card">
				<div className="stat-icon">🔐</div>
				<div className="stat-value">{successRate}%</div>
				<div className="stat-label">Success Rate</div>
			</div>
		</div>
	);
}

