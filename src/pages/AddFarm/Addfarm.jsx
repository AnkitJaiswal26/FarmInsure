import React, { useCallback, useEffect, useState, useRef } from "react";
import styles from "./AddFarm.module.css";
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

const AddFarm = () => {
  const { t } = useTranslation();

  const hiddenChooseFile = useRef();

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

  const { email, connectUsingArcana, currentAccount } = useAuth();

  const { registerUser, fetchUserByAddress } = useSafeInsureContext();

  const handleDocFileChange = async(e) => {
    e.preventDefault();
    setDocFileName(e.target.files[0].name);
    setDocFile(e.target.files);
  };
  const fetchUser = useCallback(async () => {
    try {
      const user = await fetchUserByAddress(currentAccount);
      console.log(user);
      if (user.name !== "") {
        navigate("/userDashboard");
      }
    } catch (err) {
      console.log("User cannot be fetched");
    }
  });

  useEffect(() => {
    if (currentAccount) fetchUser();
    connectUsingArcana();
  }, [currentAccount]);

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
    <>
      <ToastContainer />
      <div className={styles.mainContainer}>
        <div className={styles.secondContainer}>
          <form className={`${styles.formBox}`}>
            <div className={`${styles.header}`}>
              {t("farmer_register_head")}
            </div>
            <h2 className={`${styles.heading}`}>
              {t("farmer_register_head2")}
            </h2>
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
              <label className={`${styles.inputLabel}`}>
                Upload proof of Location
              </label>

              <div className={styles.fileUploadContainer}>
                <button
                  onClick={() => {
                    hiddenChooseFile.current.click();
                  }}
                  className={styles.chooseFileBtn}
                >
                  {docFileName === "" ? "Choose file" : docFileName}
                </button>
                <input
                  ref={hiddenChooseFile}
                  type="file"
                  id="formFile"
                  onChange={handleDocFileChange}
                  className={styles.chooseFileInput}
                />
              </div>
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
            <button className={styles.registerBtn} onClick={handleSubmit}>
              {isLoading ? (
                <BounceLoader size={24} color={"white"} />
              ) : (
                <>
                  {t("register")}
                  {/* <ArrowForwardIcon className={styles.arrowForwardIcon} /> */}
                </>
              )}
              {/* Register */}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddFarm;