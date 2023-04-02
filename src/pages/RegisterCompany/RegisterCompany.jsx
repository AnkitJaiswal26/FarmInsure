import React, { useCallback, useEffect, useState, useRef } from "react";
import styles from "./RegisterCompany.module.css";
import { useNavigate } from "react-router-dom";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuth } from "../../Context/AuthContext";
import { BounceLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useSafeInsureContext } from "../../Context/SafeInsureContext";

const RegisterCompany = () => {
	const { t } = useTranslation();

	const hiddenChooseFile = useRef();

	const navigate = useNavigate();

	const [email, setEmail] = useState("");

	//BNB
	const [name, setName] = useState("");
	const [docFileName, setDocFileName] = useState("");
	const [docFile, setDocFile] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { connectUsingArcana, currentAccount } = useAuth();

	const { registerCompany, fetchCompanyByAddress, fetchActiveRequests } =
		useSafeInsureContext();
	const fetchUser = useCallback(async () => {
		try {
			const user = await fetchCompanyByAddress(currentAccount);
			console.log(user);
			if (user.name !== "") {
				navigate("/company");
			}
		} catch (err) {
			const data = await fetchActiveRequests();
			console.log(data);
			console.log("User cannot be fetched");
		}
	});
	const handleDocFileChange = (e) => {
		setDocFileName(e.target.files[0].name);
		setDocFile(e.target.files);
	};

	useEffect(() => {
		if (currentAccount) fetchUser();
		connectUsingArcana();
	}, [currentAccount]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (name === "" || mobileNo === "") {
				toast.error("Enter all details first");
				return;
			} else {
				setIsLoading(true);
				toast.warn("Please wait for a moment");
				await registerCompany(currentAccount, name, mobileNo);
				toast.success("User registered successfully");
				navigate("/companyDashboard");
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
			<div className={styles.registerPageContainer}>
				<div className={styles.registerfarmerbody}></div>
				<form className={`${styles.formBox}`} onSubmit={handleSubmit}>
					{/* <div className={`${styles.header}`}>
						{t("company_register_head")}
					</div> */}
					<div className={`${styles.paper}`}>
					<h2 className={`${styles.heading}`}>
						{t("company_register_head2")}
					</h2>

					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							{t("cname")}
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
							{t("cemail")}
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
							{t("cno")}
						</label>
						<input
							className={`${styles.input}`}
							type="text"
							onChange={(e) => setMobileNo(e.target.value)}
							value={mobileNo}
						/>
					</div>
					{/* <div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							{t("upload")}
						</label>

						<div className={styles.fileUploadContainer}>
							<button
								onClick={() => {
									hiddenChooseFile.current.click();
								}}
								className={styles.chooseFileBtn}
							>
								{docFileName === "" ? t("file") : docFileName}
							</button>
							<input
								ref={hiddenChooseFile}
								type="file"
								id="formFile"
								onChange={handleDocFileChange}
								className={styles.chooseFileInput}
							/>
						</div>
					</div> */}

					<button
						className={styles.registerBtn}
						onClick={handleSubmit}
					>
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
					</div>
				</form>
			</div>
		</>
	);
};

export default RegisterCompany;
