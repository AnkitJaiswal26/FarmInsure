import logo from "./logo.svg";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RegisterFarmer from "./pages/RegisterFarmer/RegisterFarmer";
import MainPage from "./pages/MainPage/MainPage";
import Register from "./pages/Register/Register";
import RegisterCompany from "./pages/RegisterCompany/RegisterCompany";
import FarmerDashboard from "./pages/FarmerDashboard/FarmerDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import InsuranceList from "./pages/InsuranceList/InsuranceList";
import Insurance from "./pages/Insurance/Insurance";
import AddFarm from "./pages/AddFarm/Addfarm";
import ApplyInsurance from "./pages/ApplyInsurance/ApplyInsurance";
import CompanyDashboard from "./pages/CompanyDashboard/CompanyDashboard";

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
		{
			path: "/:id/farmerdashboard",
			element: (
				<>
					<FarmerDashboard />
				</>
			),
		},
		{
			path: "/addfarm",
			element: (
				<>
					<AddFarm />
				</>
			),
		},
		,
		{
			path: "/insurances",
			element: (
				<>
					<InsuranceList />
				</>
			),
		},
		{
			path: "/:address/:id/insurance",
			element: (
				<>
					<Insurance />
				</>
			),
		},
		,
		{
			path: "/:id/apply",
			element: (
				<>
					<ApplyInsurance />
				</>
			),
		},
		{
			path: "/admin",
			element: (
				<>
					<AdminDashboard />
				</>
			),
    },
    {
      path: "/company",
			element: (
				<>
					<CompanyDashboard />
				</>
			),
    }
  ]);

	return (
		<>
			<RouterProvider router={router}></RouterProvider>
		</>
	);
};

export default App;
