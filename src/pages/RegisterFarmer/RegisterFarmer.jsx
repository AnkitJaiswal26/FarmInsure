import React, { useCallback, useEffect, useState } from "react";
import styles from "./RegisterFarmer.module.css";
import { useNavigate } from "react-router-dom";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuth } from "../../Context/AuthContext";
import { BounceLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { useSafeInsureContext } from "../../Context/SafeInsureContext";

const RegisterFarmer = () => {
	const navigate = useNavigate();

	// const [email, setEmail] = useState("");

	//BNB
	const [name, setName] = useState("");
	const [age, setAge] = useState(0);
	const [gender, setGender] = useState("Male");

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
			<div className={styles.registerPageContainer}>
				<div className={styles.registerfarmerbody}></div>
				<form className={`${styles.formBox}`} onSubmit={handleSubmit}>
					<div className={`${styles.header}`}>
						Automate your Insurance Claims!
					</div>
					<h2 className={`${styles.heading}`}>
						Farmer's Registration
					</h2>

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
						<label className={`${styles.inputLabel}`}>
							Full Name
						</label>
						<input
							className={`${styles.input}`}
							type="text"
							onChange={(e) => setName(e.target.value)}
							value={name}
						/>
					</div>
					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>Email</label>
						<input
							className={`${styles.input}`}
							type="text"
							disabled
							value={email}
						/>
					</div>
					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							Mobile No
						</label>
						<input
							className={`${styles.input}`}
							type="text"
							onChange={(e) => setMobileNo(e.target.value)}
							value={mobileNo}
						/>
					</div>
					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>Age</label>
						<input
							className={`${styles.input}`}
							type="number"
							onChange={(e) => setAge(e.target.value)}
							value={age}
						/>
					</div>
					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>Gender</label>
						<select
							className={`${styles.input}`}
							onChange={(e) => {
								console.log(e.target.value);
								setGender(e.target.value);
							}}
						>
							<option value={"Male"}>Male</option>
							<option value={"Female"}>Female</option>
							<option value={"Other"}>Other</option>
						</select>
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

export default RegisterFarmer;
