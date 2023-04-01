import React, { useCallback, useEffect, useState } from "react";
import styles from "./RegisterFarmer.module.css";
import { useNavigate } from "react-router-dom";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuth } from "../../Context/AuthContext";
import { BounceLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import MoonLoader from "react-spinners/MoonLoader";
import Modal from "react-modal";
import axios from "../../helpers/axios";
import { useSafeInsureContext } from "../../Context/SafeInsureContext";

const RegisterFarmer = () => {
	const { t } = useTranslation();

	const navigate = useNavigate();

  const [pubAddr, setPubAddr] = useState("");
  const [eemail, setEmail] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("Male");
  const [otp, setOtp] = useState("");

	const [mobileNo, setMobileNo] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { email, connectUsingArcana, currentAccount } = useAuth();

	const { registerUser, fetchUserByAddress } = useSafeInsureContext();
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

  function closeModal() {
    setModalIsOpen(false);
  }
  const openModal = async (e) => {
    e.preventDefault();
    if (
      mobileNo === ""     ) {
      toast.error("Enter mobile number first");
      return;
    } else {
    // if (email.slice(-10) === "vjti.ac.in") {
    setModalIsOpen(true);
    console.log(modalIsOpen);
    await axios
      .post("/register", { mobileNo })
      .then((res) => {
        console.log("res", res);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log("Errrr", err);
        toast.error(err);
      });
    } 
    // else {
    // toast.error("Please enter vjti email address");
    // return;
    // }
    // return;
    // }
  };

  useEffect(() => {
		if (currentAccount) fetchUser();
		connectUsingArcana();
	}, [currentAccount]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (name === "" || mobileNo === "" || age === 0 || gender === "") {
				toast.error("Enter all details first");
				return;
			} else {
				setIsLoading(true);
				toast.warn("Please wait for a moment");
				console.log(currentAccount, name, email, mobileNo, gender, age);
				console.log(typeof parseInt(age));
				await registerUser(
					currentAccount,
					name,
					parseInt(age),
					gender,
					email,
					mobileNo
				);
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
      {/* <div className={styles.registerPageContainer}> */}
      <div className={styles.registerfarmerbody}></div>
      <form className={`${styles.formBox}`} onSubmit={handleSubmit}>
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
              Enter OTP
            </h2>

            <form>
              <div className={styles.inputContainer}>
                <input
                  className={`${styles.modalInput}`}
                  style={{
                    resize: "none",
                  }}
                  type="text"
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                />
              </div>

              <button
                className={`${styles.submitOtpButton}`}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <MoonLoader
                    className={styles.loader}
                    color="white"
                    size={10}
                  />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </Modal>{" "}
        <div className={`${styles.header}`}>{t("farmer_register_head")}</div>
        <h2 className={`${styles.heading}`}>{t("farmer_register_head2")}</h2>
        <div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							Account address
						</label>
						<input
							className={`${styles.input}`}
							type="text"
							disabled
							value={currentAccount}
						/>
					</div>
        <div className={`${styles.inputContainer}`}>
          <label className={`${styles.inputLabel}`}>{t("name")}</label>
          <input
            className={`${styles.input}`}
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className={`${styles.inputContainer}`}>
          <label className={`${styles.inputLabel}`}>{t("email")}</label>
          <input
            className={`${styles.input}`}
            type="text"
            disabled
            // onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={`${styles.inputContainer2}`}>
          <div  className={`${styles.inputContainer}`}>
            <label className={`${styles.inputLabel}`}>{t("mobile")}</label>
            <input
              className={`${styles.input}`}
              type="text"
              onChange={(e) => setMobileNo(e.target.value)}
              value={mobileNo}
            />
          </div>
          <button onClick={openModal} className={styles.verifyButton}>
            Verify
          </button>
        </div>
        <div className={`${styles.inputContainer}`}>
          <label className={`${styles.inputLabel}`}>{t("age")}</label>
          <input
            className={`${styles.input}`}
            type="number"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
        </div>
        <div className={`${styles.inputContainer}`}>
          <label className={`${styles.inputLabel}`}>{t("gender")}</label>
          <select
            className={`${styles.input}`}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value={"Male"}>{t("male")}</option>
            <option value={"Female"}>{t("female")}</option>
            <option value={"Other"}>{t("other")}</option>
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
      {/* </div> */}
    </>
  );
};

export default RegisterFarmer;
