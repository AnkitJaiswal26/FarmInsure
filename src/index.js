import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import "./i18n.js";
import "./i18nextConf.js";
import { AuthContextProvider } from "./Context/AuthContext";
import { SafeInsureProvider } from "./Context/SafeInsureContext";
import { AuthProvider } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";
import "react-toastify/dist/ReactToastify.css";

const provider = new AuthProvider("978bf98b19a6d13d221128e21280766c7ac70ca0", {
	chainConfig: {
		chainId: "0x13881",
		rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/VU5Z6_VJgdMUgrcfhGsHk2o5tzEfFbhT",
		// rpcUrl: "https://rpc.testnet.mantle.xyz/",
	},
}); // required

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Suspense fallback="...loading">
			<ProvideAuth provider={provider}>
				<AuthContextProvider>
					<SafeInsureProvider>
						<App />
					</SafeInsureProvider>
				</AuthContextProvider>
			</ProvideAuth>
		</Suspense>
	</React.StrictMode>
);
