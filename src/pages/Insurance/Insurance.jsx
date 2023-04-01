import styles from "./Insurance.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import fvector from "../../images/fvector.jpg";

const Insurance = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const navigateInsurances = () => {
		navigate("/insurances");
	};

	return (
		<>
			<div className={styles.mainContainer}>
				<div className={styles.secondContainer}>
					<h1 className={styles.mainHeading}>Insurance Heading</h1>
					<img src={fvector} className={styles.insuranceImage} />
					<div className={styles.shadow}></div>
					<div className={styles.insuranceDetails}>
						<div className={styles.insuranceInfo}>
							Premium: <span className={styles.values}>1000</span>
						</div>
						<div className={styles.insuranceInfo}>
							Duration:{" "}
							<span className={styles.values}>1 year</span>
						</div>
						<div className={styles.insuranceInfo}>
							Documents:{" "}
							<span className={styles.values}>Aadhar Card</span>
						</div>
					</div>
					<div className={styles.shadow}></div>
					<div className={styles.description}>
						To protect farmers from financial losses due to crop
						damage or yield losses caused by natural disasters, such
						as drought, floods, pests, or other unforeseen events.
						This type of insurance is commonly offered by government
						agencies and private insurance companies to provide
						financial support to farmers who may suffer significant
						losses due to uncontrollable circumstances.
					</div>
					<div className={styles.shadow}></div>
					<button
						className={styles.registerBtn}
						// onClick={handleRegisterInsuranceCompany}
					>
						<>
							Apply
							{/* <ArrowForwardIcon className={styles.arrowForwardIcon} /> */}
						</>
					</button>
				</div>
			</div>
		</>
	);
};
export default Insurance;
