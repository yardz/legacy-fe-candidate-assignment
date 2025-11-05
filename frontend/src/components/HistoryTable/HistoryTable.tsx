import { shallowEqual, useSelector } from "react-redux";
import { HistorySlice } from "../../store/slices/HistorySlice";
import { copyToClipboard } from "../../utils/copyToClipboard";

import "./HistoryTable.css";

export function HistoryTable() {
	const history = useSelector(
		HistorySlice.selectors.selectHistory,
		shallowEqual
	);

	const truncateString = (str: string, maxLength: number = 20) => {
		if (str.length <= maxLength) return str;
		return `${str.substring(0, maxLength)}...`;
	};

	if (history.length === 0) {
		return (
			<div className="history-table-container">
				<h2 className="history-title">Signature History</h2>
				<div className="empty-state">
					<p>No signatures yet. Sign your first message above!</p>
				</div>
			</div>
		);
	}

	return (
		<div className="history-table-container">
			<h2 className="history-title">Signature History ({history.length})</h2>
			<div className="table-wrapper">
				<table className="history-table">
					<thead>
						<tr>
							<th>#</th>
							<th>📝 Message</th>
							<th>🔑 Signature</th>
							<th>👤 Signer</th>
							<th>✓ Status</th>
							<th>⚙️ Actions</th>
						</tr>
					</thead>
					<tbody>
						{history.map((item, index) => (
							<tr key={index}>
								<td className="index-cell">{history.length - index}</td>
								<td className="message-cell">
									<span title={item.message} className="truncated-text">
										{truncateString(item.message, 30)}
									</span>
								</td>
								<td className="signature-cell">
									<div className="signature-wrapper">
										<code title={item.signature} className="truncated-text">
											{truncateString(item.signature, 15)}
										</code>
										<button
											className="copy-btn"
											onClick={() =>
												copyToClipboard(
													item.signature,
													"Signature copied to clipboard!"
												)
											}
											title="Copy signature"
										>
											📋
										</button>
									</div>
								</td>
								<td className="signer-cell">
									<div className="signer-wrapper">
										<code title={item.signer} className="truncated-text">
											{truncateString(item.signer, 12)}
										</code>
										<button
											className="copy-btn"
											onClick={() =>
												copyToClipboard(
													item.signer,
													"Signer address copied to clipboard!"
												)
											}
											title="Copy address"
										>
											📋
										</button>
									</div>
								</td>
								<td className="status-cell">
									{item.verified ? (
										<span className="badge badge-success">✓ Verified</span>
									) : (
										<span className="badge badge-error">✗ Failed</span>
									)}
								</td>
								<td className="actions-cell">
									<button
										className="view-btn"
										onClick={() => {
											alert(
												`Message: ${item.message}\n\nSignature: ${item.signature}\n\nSigner: ${item.signer}`
											);
										}}
										title="View details"
									>
										👁️ View
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
