import styles from "./InsuranceList.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const InsuranceList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateInsurances = ()=>{
    navigate("/insurances")
  }

  return (
    <>
      <div className={styles.insuranceMain}>
      <div className={styles.secondContainer}>
        <h1 className={styles.insuranceHead}>Explore our Insurances!</h1>
        <h3 className={styles.secondaryHeading}>
          Protect Your Harvest, Secure Your Future with Farmer Insurance
        </h3>
        <div className={styles.insuranceBox}>
          <h2 className={styles.insuranceListHead}>Insurances</h2>
          <div className={styles.shadow}></div>
          <div className={styles.insuranceCards}>
            <div className={styles.insurance}>
            <div className={styles.headInsurance}>Prime Insurance</div>
              <div className={styles.details}>Period: <span className={styles.values}>1 year</span></div>
              <div className={styles.details}>Description : <span className={styles.values}>To protect farmers from financial losses due to crop damage</span></div>
              <div className={styles.details}>Documents: <span className={styles.values}>Aadhar Card</span></div>
              <button className={styles.button}>Check</button>
            </div>
            <div className={styles.insurance}>
            <div className={styles.headInsurance}>Prime Insurance</div>
            <div className={styles.details}>Period: <span className={styles.values}>1 year</span></div>
              <div className={styles.details}>Description : <span className={styles.values}>To protect farmers from financial losses due to crop damage</span></div>
              <div className={styles.details}>Documents: <span className={styles.values}>Aadhar Card</span></div>
              <button className={styles.button}>Check</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default InsuranceList;
