import React, { useCallback, useEffect, useState, useRef } from "react";
import styles from "./CompanyDashboard.module.css";
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

const CompanyDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [payout, setPayout] = useState("");
  const [premium, setPremium] = useState("");
  const [duration, setDuration] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function closeModal() {
    setModalIsOpen(false);
  }

  const openModal = async (e) =>{
    e.preventDefault();
    setModalIsOpen(true);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (duration === "" || premium === "" || payout === "") {
      toast.error("Enter all details");
      return;
    } else {
      // if (email.slice(-10) === "vjti.ac.in") {
    //   setModalIsOpen(true);
    //   console.log(modalIsOpen);
    //   await axios
    //     .post("/register", { mobileNo })
    //     .then((res) => {
    //       console.log("res", res);
    //       toast.success(res.data.message);
    //     })
    //     .catch((err) => {
    //       console.log("Errrr", err);
    //       toast.error(err);
    //     });
    }
    // else {
    // toast.error("Please enter vjti email address");
    // return;
    // }
    // return;
    // }
  };

  return (
    <div className={styles.mainContainer}>
      <ToastContainer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Enter OTP"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
          },
        }}
      >
        <div className={styles.modalContainer}>
          <button className={styles.closeButton} onClick={closeModal}>
            <CloseIcon />
          </button>
          <h2
            className={styles.heading}
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            Enter details
          </h2>

          <form>
            <div className={styles.inputContainer}>
              <input
                className={`${styles.modalInput}`}
                style={{
                  resize: "none",
                }}
                type="number"
                placeholder="Enter Premium"
                onChange={(e) => setPremium(e.target.value)}
                value={premium}
              />
            </div>
            <div className={styles.inputContainer}>
              <input
                className={`${styles.modalInput}`}
                style={{
                  resize: "none",
                }}
                type="number"
                placeholder="Enter Payout"
                onChange={(e) => setPayout(e.target.value)}
                value={payout}
              />
            </div>
            <div className={styles.inputContainer}>
              <input
                className={`${styles.modalInput}`}
                style={{
                  resize: "none",
                }}
                type="text"
                placeholder="Enter duration"
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
              />
            </div>
            <button
              className={`${styles.submitButton}`}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <MoonLoader className={styles.loader} color="white" size={10} />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </Modal>{" "}
      <div className={styles.secondContainer}>
        <h1 className={styles.mainHeading}>Insurance Company</h1>
        <div className={styles.viewFarms}>
          <h2 className={styles.farmsHead}>View My Customers</h2>
          <div className={styles.shadow}></div>
          <div className={styles.farmsCards}>
            <div className={styles.farm}>
              <div className={styles.headFarm}>FileName</div>
              <div className={styles.details}>
                Location: <span className={styles.values}>Latur</span>
              </div>
              <div className={styles.details}>
                LandArea: <span className={styles.values}>2 acre</span>
              </div>
              <div className={styles.details}>
                CropType: <span className={styles.values}>Rabi</span>
              </div>
              <button className={styles.button}>Verify</button>
            </div>
            <div className={styles.farm}>
              <div className={styles.headFarm}>FileName</div>
              <div className={styles.details}>
                Location: <span className={styles.values}>Bhusawal</span>
              </div>
              <div className={styles.details}>
                LandArea: <span className={styles.values}>1 acre</span>
              </div>
              <div className={styles.details}>
                CropType: <span className={styles.values}>Kharif</span>
              </div>
              <button className={styles.button}>Verify</button>
            </div>
          </div>
        </div>
        <div className={styles.viewInsurances}>
          <div className={styles.insuranceHeadBox}>
            <h2 className={styles.insuranceHead}>View My Insurances</h2>
            <button
                onClick={openModal}
              className={styles.button2}
            >
              Add Insurance
            </button>
          </div>
          <div className={styles.shadow}></div>
          <div className={styles.insuranceCards}>
            <div className={styles.insurance}>
              {/* uint256 userId;
        string location;
        uint256 landArea;
        string cropType;
        string ipfsHash;
        string fileName; */}
              <div className={styles.headInsurance}>Insurance</div>
              <div className={styles.details}>
                Payout: <span className={styles.values}>1 year</span>
              </div>
              <div className={styles.details}>
                Premium: <span className={styles.values}>1000</span>
              </div>
              <div className={styles.details}>
                Duration: <span className={styles.values}>7th April</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompanyDashboard;
