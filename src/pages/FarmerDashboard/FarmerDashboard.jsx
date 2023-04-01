import styles from "./FarmerDashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FarmerDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.dashboardMain}>
        <h1 className={styles.mainHeading}>Hello Atharva!</h1>
        <div className={styles.buttons}>
          <button className={styles.button}>Edit Profile</button>
          <button className={styles.button}>Change Language</button>
          <button className={styles.button}>Contact Us</button>
        </div>
        <div className={styles.viewFarms}>
          <div className={styles.farmsHeadBox}>
            <h2 className={styles.farmsHead}>View My Farms</h2>
            <button className={styles.button2}>Add Farm</button>
          </div>
          <div className={styles.farmsCards}>
            <div className={styles.farm}>
              <div className={styles.headFarm}>fileName</div>
              <div className={styles.details}>location</div>
              <div className={styles.details}>landArea</div>
              <div className={styles.details}>cropType</div>
            </div>
            <div className={styles.farm}>
              <div className={styles.headFarm}>fileName</div>
              <div className={styles.details}>location</div>
              <div className={styles.details}>landArea</div>
              <div className={styles.details}>cropType</div>
            </div>
          </div>
        </div>
        <div className={styles.viewInsurances}>
          <div className={styles.insuranceHeadBox}>
            <h2 className={styles.insuranceHead}>View My Insurances</h2>
            <button className={styles.button2}>Explore Insurances</button>
          </div>
          <div className={styles.insuranceCards}>
            <div className={styles.insurance}>
              {/* uint256 userId;
        string location;
        uint256 landArea;
        string cropType;
        string ipfsHash;
        string fileName; */}
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
export default FarmerDashboard;
