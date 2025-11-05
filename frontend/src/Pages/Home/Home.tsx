import { Link } from "react-router-dom";
import "./Home.css";

export function Home() {
	return (
		<div className="home-container">
			<div className="home-background"></div>
			
			<div className="home-content">
				<div className="home-hero">
					<div className="home-icon">🚀</div>
					<h1 className="home-title">Web3 Signature Verification</h1>
					<p className="home-subtitle">Secure. Simple. Decentralized.</p>
					<p className="home-description">
						Sign and verify messages using blockchain technology. 
						Prove ownership of your wallet without revealing your private keys.
					</p>
				</div>

				<div className="home-features">
					<div className="home-feature-card">
						<span className="home-feature-icon">🔐</span>
						<h3 className="home-feature-title">Secure</h3>
						<p className="home-feature-text">
							Your private keys never leave your wallet. All signatures are cryptographically secure.
						</p>
					</div>

					<div className="home-feature-card">
						<span className="home-feature-icon">⚡</span>
						<h3 className="home-feature-title">Fast</h3>
						<p className="home-feature-text">
							Sign messages instantly with your connected wallet. No complex setup required.
						</p>
					</div>

					<div className="home-feature-card">
						<span className="home-feature-icon">📝</span>
						<h3 className="home-feature-title">Traceable</h3>
						<p className="home-feature-text">
							Keep track of all your signatures and verify them anytime, anywhere.
						</p>
					</div>
				</div>

				<div className="home-cta">
					<Link to="/login" className="home-button home-button-primary">
						<span>🔑 Get Started</span>
					</Link>
					<Link to="/dashboard" className="home-button home-button-secondary">
						<span>📊 Dashboard</span>
					</Link>
				</div>

				<div className="home-security">
					<div className="home-security-content">
						<span className="home-security-icon">🛡️</span>
						<div className="home-security-text">
							<div className="home-security-title">Blockchain Secured</div>
							<div className="home-security-subtitle">
								Powered by cryptographic signatures
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

