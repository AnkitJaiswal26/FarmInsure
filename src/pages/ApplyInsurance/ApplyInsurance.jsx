import React, { useCallback, useEffect, useState, useRef } from "react";
import styles from "./ApplyInsurance.module.css";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuth } from "../../Context/AuthContext";
import { BounceLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import MoonLoader from "react-spinners/MoonLoader";
import Modal from "react-modal";
import axios from "../../helpers/axios";
import { useSafeInsureContext } from "../../Context/SafeInsureContext";

const ApplyInsurance = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [pubAddr, setPubAddr] = useState("");
  const [eemail, setEmail] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [docFileName, setDocFileName] = useState("");
  const [docFile, setDocFile] = useState("");
  const [landArea, setLandArea] = useState(0);
  const [cropType, setCropType] = useState("Rabi");
  const [otp, setOtp] = useState("");

  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [farms, setFarms] = useState(["farm1", "farm2"]);

  const { email, connectUsingArcana, currentAccount } = useAuth();

  const { registerUser, fetchUserByAddress } = useSafeInsureContext();

  const navigateInsurances = () => {
    navigate("/insurances");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        location === "" ||
        cropType === "" ||
        docFileName === 0 ||
        landArea === ""
      ) {
        toast.error("Enter all details first");
        return;
      } else {
        setIsLoading(true);
        toast.warn("Please wait for a moment");
        // console.log(currentAccount, name, email, mobileNo, gender, age);
        // console.log(typeof parseInt(age));
        await registerUser();
        //   currentAccount,
        //   name,
        //   parseInt(age),
        //   gender,
        //   email,
        //   mobileNo
        toast.success("User registered successfully");
        navigate("/userDashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error("User not registered");
      setIsLoading(false);
    }
    setIsLoading(false);
    console.log("Register");
  };

  return (
    <div className={styles.mainContainer}>
      <ToastContainer />
      <div className={styles.secondContainer}>
        <h1 className={styles.heading}>Apply to Insurance Premium!</h1>
        <form className={`${styles.formBox}`} onSubmit={handleSubmit}>
          {/* <div className={`${styles.header}`}>
            To protect farmers from financial losses due to crop damage or yield
            losses caused by natural disasters
          </div> */}
          <div className={`${styles.inputContainer}`}>
            <label className={`${styles.inputLabel}`}>Location</label>
            <input
              className={`${styles.input}`}
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            />
          </div>
          <div className={`${styles.inputContainer}`}>
            <label className={`${styles.inputLabel}`}>
              Land Area(in acres)
            </label>
            <input
              className={`${styles.input}`}
              type="number"
              onChange={(e) => setLandArea(e.target.value)}
              value={landArea}
            />
          </div>

          <div className={`${styles.inputContainer}`}>
            <label className={`${styles.inputLabel}`}>Crop Type</label>
            <select
              className={`${styles.input}`}
              onChange={(e) => setCropType(e.target.value)}
            >
              <option value="Rabi">Rabi</option>
              <option value="Kharif">Kharif</option>
              {/* <option>Others</option> */}
            </select>
          </div>
          <div className={`${styles.inputContainer}`}>
            <label className={`${styles.inputLabel}`}>Farm No.</label>
            <select
              onChange={(e) => {
                setFarms(e.target.value);
              }}
              className={`${styles.input}`}
            >
              {/* <option key={0}></option> */}
              {farms.map((value, id) => {
                return <option key={id}>{value}</option>;
              })}
            </select>
          </div>
          <button className={styles.registerBtn} onClick={handleSubmit}>
            {isLoading ? (
              <BounceLoader size={24} color={"white"} />
            ) : (
              <>Submit</>
            )}
            {/* Register */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyInsurance;
