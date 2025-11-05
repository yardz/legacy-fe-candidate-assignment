import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { DynamicProvider } from "./Providers/DynamicProvider.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { Slide, ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<DynamicProvider>
					<App />
					<ToastContainer
						position="top-right"
						autoClose={4000}
						hideProgressBar={false}
						newestOnTop={true}
						closeOnClick={true}
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
						transition={Slide}
						limit={3}
					/>
				</DynamicProvider>
			</PersistGate>
		</Provider>
	</StrictMode>
);
