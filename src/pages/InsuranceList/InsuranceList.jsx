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
        <h1 className={styles.insuranceHead}>Explore our Insurances!</h1>
        <h3 className={styles.secondaryHeading}>
          Protect Your Harvest, Secure Your Future with Farmer Insurance
        </h3>
        <div className={styles.insuranceBox}>
          <h2 className={styles.insuranceListHead}>Insurances</h2>
          <div className={styles.insuranceCards}>
            <div className={styles.insurance}>
            <div className={styles.headInsurance}>fileName</div>
              <div className={styles.details}>period</div>
              <div className={styles.details}>description</div>
              <div className={styles.details}>type</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsuranceList;
