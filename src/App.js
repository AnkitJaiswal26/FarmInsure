import logo from "./logo.svg";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RegisterFarmer from "./pages/RegisterFarmer/RegisterFarmer";
import MainPage from "./pages/MainPage/MainPage";
import Register from "./pages/Register/Register";
import RegisterCompany from "./pages/RegisterCompany/RegisterCompany";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<>
					<MainPage />
				</>
			),
		},
		{
			path: "/register",
			element: (
				<>
					<Register />
				</>
			),
		},
		{
			path: "/registerfarmer",
			element: (
				<>
					{/* <Navbar /> */}
					<RegisterFarmer />
				</>
			),
		},
		{
			path: "registercompany",
			element: (
				<>
					<RegisterCompany />
				</>
			),
		},
	]);

	return (
		<>
			<RouterProvider router={router}></RouterProvider>
		</>
	);
};

export default App;
