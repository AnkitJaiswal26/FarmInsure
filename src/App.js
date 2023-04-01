import logo from "./logo.svg";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RegisterFarmer from "./pages/RegisterFarmer/RegisterFarmer";
import MainPage from "./pages/MainPage/MainPage";
import Register from "./pages/Register/Register";
import RegisterCompany from "./pages/RegisterCompany/RegisterCompany";
import FarmerDashboard from "./pages/FarmerDashboard/FarmerDashboard";
import InsuranceList from "./pages/InsuranceList/InsuranceList";
import Insurance from "./pages/Insurance/Insurance";
import AddFarm from "./pages/AddFarm/Addfarm";

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
      element :(
        <>
          <FarmerDashboard/>
        </>
      )
    },
    {
      path: "/:id/addfarm",
      element :(
        <>
          <AddFarm/>
        </>
      )
    },
    ,
    {
      path: "/insurances",
      element :(
        <>
          <InsuranceList/>
        </>
      )
    },
    {
      path: "/:id/insurance",
      element :(
        <>
          <Insurance/>
        </>
      )
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
