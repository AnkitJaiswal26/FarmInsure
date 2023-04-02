import React, { useCallback, useEffect, useState } from "react";
import { useSafeInsureContext } from "../../Context/SafeInsureContext";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from './FarmerInsurance.module.css';
const FarmerInsurance = () => {
	const { connectUsingArcana, currentAccount } = useAuth();
	const navigate = useNavigate();

	const {
		fetchUserByAddress,
		fetchPremium,
		getClaimable,
		fetchDetails,
		getContractStatusForMain,
		claimPremium,
		payPremium,
	} = useSafeInsureContext();

	const [contractActive, setContractActive] = useState(true);
	const [claimable, setClaimable] = useState(false);

	const [premium, setPremium] = useState([]);
	const [details, setDetails] = useState([]);

	const fetchUser = useCallback(async () => {
		try {
			const user = await fetchUserByAddress(currentAccount);
			console.log(user);
			const contractAdd = window.location.href.split("/")[2];
			const activity = await getContractStatusForMain(contractAdd);
			setContractActive(activity);

			const _claim = await getClaimable(contractAdd);
			setClaimable(_claim);

			const prem = await fetchPremium(contractAdd);
			setPremium(prem);

			const details = await fetchDetails(contractAdd);
			setDetails(details);
		} catch (err) {
			navigate("/register");
		}
	});

	useEffect(() => {
		if (currentAccount) fetchUser();
		connectUsingArcana();
	}, [currentAccount]);

	const payPremiumBtn = async (e) => {
		e.preventDefault();
		try {
			const contractAdd = window.location.href.split("/")[2];
			await payPremium(contractAdd, premium.totalAmount / premium.months);
		} catch (err) {
			console.log(err);
		}
	};

	const claimPremiumBtn = async (e) => {
		e.preventDefault();
		try {
			const contractAdd = window.location.href.split("/")[2];
			await claimPremium(contractAdd);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={styles.mainContainer}>
			<div className={styles.secondContainer}>
				<h1 className={styles.mainHeading}>Farmer Insurance</h1>
				<div className={styles.shadow}></div>
					<div className={styles.details}>
						Details:
						<div className={styles.paper}>
							<h4>
								Crop Type: {details ? details.cropType : ""}
							</h4>
							<h4>
								Location: {details ? details.cropLocation : ""}
							</h4>
							<h4>
								Premium: {premium ? premium.totalAmount : ""}
							</h4>
							<h4>
								Total Months: {premium ? premium.months : ""}
							</h4>
							<h4>
								Months Remaining:{" "}
								{premium
									? premium.months - premium.currentMonth
									: ""}
							</h4>
							<h4>
								Remaining premium:{" "}
								{premium ? premium.remainingAmount : ""}
							</h4>
							{new Date() - premium.monthDate > 0 ? (
								<button onClick={payPremiumBtn} className={styles.button}>
									Pay Premium
								</button>
							) : null}
							{claimable ? (
								<button onClick={claimPremiumBtn} className={styles.button2}>
									Claim Premium
								</button>
							) : null}
						</div>
					</div>
			</div>
		</div>
	);
};

export default FarmerInsurance;
