import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { useDispatch } from "react-redux";
import { HistorySlice } from "../store/slices";

const environmentId = import.meta.env.VITE_DYNAMIC_XYZ_ENV_ID;

export function DynamicProvider({ children }: { children: React.ReactNode }) {
	const dispatch = useDispatch();
	return (
		<DynamicContextProvider
			settings={{
				environmentId,
				walletConnectors: [EthereumWalletConnectors],
				events: {
					onLogout: () => {
						window.location.href = "/";
						dispatch(HistorySlice.actions.clear());
					},
				},
			}}
		>
			{children}
		</DynamicContextProvider>
	);
}
