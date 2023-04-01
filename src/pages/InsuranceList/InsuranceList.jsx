import styles from "./InsuranceList.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSafeInsureContext } from "../../Context/SafeInsureContext";
import { useAuth } from "../../Context/AuthContext";
import { useCallback, useEffect, useState } from "react";

const InsuranceList = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { connectUsingArcana, currentAccount } = useAuth();

	const { fetchUserByAddress, fetchAllInsurances } = useSafeInsureContext();

	const [ins, setIns] = useState([]);
	const fetchUser = useCallback(async () => {
		try {
			const user = await fetchUserByAddress(currentAccount);
			console.log(user);
			const data = fetchAllInsurances();
			if (data) {
				setIns(data);
			}
		} catch (err) {
			navigate("/register");
		}
	});

	useEffect(() => {
		if (currentAccount) fetchUser();
		connectUsingArcana();
	}, [currentAccount]);

	return (
		<>
			<div className={styles.insuranceMain}>
				<div className={styles.secondContainer}>
					<h1 className={styles.insuranceHead}>
						Explore our Insurances!
					</h1>
					<h3 className={styles.secondaryHeading}>
						Protect Your Harvest, Secure Your Future with Farmer
						Insurance
					</h3>
					<div className={styles.insuranceBox}>
						<h2 className={styles.insuranceListHead}>Insurances</h2>
						<div className={styles.shadow}></div>
						<div className={styles.insuranceCards}>
							{ins.map((val, index) => {
								return (
									<div className={styles.insurance}>
										<div className={styles.headInsurance}>
											{val.name}
										</div>
										<div className={styles.details}>
											Period:{" "}
											<span className={styles.values}>
												{val.duration} months
											</span>
										</div>
										<div className={styles.details}>
											Premium/month:{" "}
											<span className={styles.values}>
												{val.premium}
											</span>
										</div>
										<div className={styles.details}>
											Payout:{" "}
											<span className={styles.values}>
												{val.payout}
											</span>
										</div>
										<button
											className={styles.button}
											onClick={(e) => {
												e.preventDefault();
												navigate(
													`/${val.contractAddress}/${val.id}/details`
												);
											}}
										>
											Check
										</button>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default InsuranceList;
