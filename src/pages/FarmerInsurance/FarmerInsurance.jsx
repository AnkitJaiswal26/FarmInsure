import React, { useCallback, useEffect, useState } from "react";
import { useSafeInsureContext } from "../../Context/SafeInsureContext";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

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
		<div>
			<div>
				<div>Farmer Insurane</div>
				<div>
					<div>
						Details:
						<div>
							<h2>
								Crop Type: {details ? details.cropType : ""}
							</h2>
							<h2>
								Location: {details ? details.cropLocation : ""}
							</h2>
							<h2>
								Premium: {premium ? premium.totalAmount : ""}
							</h2>
							<h2>
								Total Months: {premium ? premium.months : ""}
							</h2>
							<h2>
								Months Remaining:{" "}
								{premium
									? premium.months - premium.currentMonth
									: ""}
							</h2>
							<h2>
								Remaining premium:{" "}
								{premium ? premium.remainingAmount : ""}
							</h2>
							{new Date() - premium.monthDate > 0 ? (
								<button onClick={payPremiumBtn}>
									Pay Premium
								</button>
							) : null}
							{claimable ? (
								<button onClick={claimPremiumBtn}>
									Claim Premium
								</button>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FarmerInsurance;
