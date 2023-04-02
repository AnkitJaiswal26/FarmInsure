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
	return (
		<div>
			<div>
				<div></div>
			</div>
		</div>
	);
};

export default FarmerInsurance;
