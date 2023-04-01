import React, { useCallback, useEffect, useState, useRef } from "react";
import styles from "./RegisterCompany.module.css";
import { useNavigate } from "react-router-dom";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuth } from "../../Context/AuthContext";
import { BounceLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { useSafeInsureContext } from "../../Context/SafeInsureContext";

const RegisterCompany = () => {
	const hiddenChooseFile = useRef();

	const navigate = useNavigate();

	const [email, setEmail] = useState("");

	//BNB
	const [name, setName] = useState("");
	const [docFileName, setDocFileName] = useState("");
	const [docFile, setDocFile] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// const { checkIfWalletConnected, currentAccount } = useAuth();

	const { registerUser, fetchUserByAddress } = useSafeInsureContext();
	const fetchUser = useCallback(async () => {
		try {
			// const user = await fetchUserByAddress(currentAccount);
			// console.log(user);
			// if (user.name !== "") {
			// 	navigate("/userDashboard");
			// }
		} catch (err) {
			//   console.log("User cann/ot be fetched");
		}
	});
	const handleDocFileChange = (e) => {
		setDocFileName(e.target.files[0].name);
		setDocFile(e.target.files);
	};

	useEffect(
		() => {
			// if (currentAccount) fetchUser();
			// checkIfWalletConnected();
		}
		//   [currentAccount]
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// try {
		//   if (
		//     name == "" ||
		//     email == "" ||
		//     mobileNo == "" ||
		//     age == 0 ||
		//     gender == ""
		//   ) {
		//     toast.error("Enter all details first");
		//     return;
		//   } else {
		//     setIsLoading(true);
		//     toast.warn("Please wait for a moment");
		//     console.log(currentAccount, name, email, mobileNo, gender, age);
		//     await registerUser(currentAccount, name, email, mobileNo, gender, age);
		//     toast.success("User registered successfully");
		// 	navigate("/userDashboard")
		//   }
		// } catch (err) {
		//   console.log(err);
		//   toast.error("User not registered");
		//   setIsLoading(false);
		// }
		// setIsLoading(false);
		// console.log("Register");
	};

	return (
		<>
			<ToastContainer />
			<div className={styles.registerPageContainer}>
				<div className={styles.registerfarmerbody}></div>
				<form className={`${styles.formBox}`} onSubmit={handleSubmit}>
					<div className={`${styles.header}`}>
						Automate your Insurance Claims!
					</div>
					<h2 className={`${styles.heading}`}>
						Insurance Company's Registration
					</h2>

					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							Company Name
						</label>
						<input
							className={`${styles.input}`}
							type="text"
							onChange={(e) => setName(e.target.value)}
							value={name}
						/>
					</div>
					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							Company Email
						</label>
						<input
							className={`${styles.input}`}
							type="text"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
					</div>
					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							Company Contact No
						</label>
						<input
							className={`${styles.input}`}
							type="text"
							onChange={(e) => setMobileNo(e.target.value)}
							value={mobileNo}
						/>
					</div>
					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							Upload Certificate of Registration
						</label>

						<div className={styles.fileUploadContainer}>
							<button
								onClick={() => {
									hiddenChooseFile.current.click();
								}}
								className={styles.chooseFileBtn}
							>
								{docFileName === ""
									? "Choose File"
									: docFileName}
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

					<button
						className={styles.registerBtn}
						onClick={handleSubmit}
					>
						{isLoading ? (
							<BounceLoader size={24} color={"white"} />
						) : (
							<>
								Register
								{/* <ArrowForwardIcon className={styles.arrowForwardIcon} /> */}
							</>
						)}
						{/* Register */}
					</button>
				</form>
			</div>
		</>
	);
};

export default RegisterCompany;
