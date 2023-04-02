import styles from "./Insurance.module.css";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import fvector from "../../images/fvector.jpg";
import { useSafeInsureContext } from "../../Context/SafeInsureContext";
import { useAuth } from "../../Context/AuthContext";

const Insurance = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [insuranceId, setInsuranceId] = useState();
  const [premium, setPremium] = useState();
  const [duration, setDuration] = useState();
  const [payout, setPayout] = useState("");
  const [insurance, setInsurance] = useState([]);
  const [location, setLocation] = useState([]);
  const [loc, setLoc] = useState("Dhule");
  const [cropType, setCropType] = useState("Rabi");

  const navigateInsurances = () => {
    navigate("/insurances");
  };

  const { connectUsingArcana, currentAccount } = useAuth();

  const {
    newContract,
    fetchUserByAddress,
    fetchInsurance,
    fetchInsuranceAddress,
    fetchUserFarms,
  } = useSafeInsureContext();

  const fetchUser = useCallback(async () => {
    try {
      const user = await fetchUserByAddress(currentAccount);
      console.log("user", user);
      setInsuranceId(parseInt(window.location.pathname.split("/")[2]));
      console.log(user);
    } catch (err) {
      navigate("/registerfarmer");
      console.log("Farmer cannot be fetched");
    }
  });

  const fetchIns = useCallback(async () => {
    try {
      const contractAddress = await fetchInsuranceAddress();

      const ins = await fetchInsurance(
        contractAddress,
        parseInt(window.location.pathname.split("/")[2])
      );

      console.log("ins fetched", ins.payout.toNumber(), insuranceId);
      setInsurance(ins);
      setPayout(ins.payout.toNumber());
      setPremium(ins.premium.toNumber());
      setDuration(ins.premium.toNumber());
    } catch (err) {
      console.log(err, insuranceId);
      console.log("Insurance not fetched");
    }
  });

  const fetchLocation = useCallback(async () => {
    try {
      const farms = await fetchUserFarms();
      const arr = [];
      for (let i = 0; i < farms.length; i++) {
        arr.push(farms[i].location.toString());
      }
      setLocation(arr);
      console.log("farms", farms, arr);
    } catch (err) {
      console.log(err, "Farms not fetched");
    }
  });

  const createInsurance = useCallback(async () => {
    try {
      const contractAddress = await fetchInsuranceAddress();
      console.log("In");
      await newContract(
        contractAddress,
        currentAccount,
        premium,
        payout,
        duration,
        loc,
        cropType
      );
      console.log("Out");
    } catch (err) {
      console.log(err, "Insurance Contract cannot be created");
    }
  });

  useEffect(() => {
    if (currentAccount) {
      fetchUser();
      fetchIns();
      fetchLocation();
    }

    connectUsingArcana();
  }, [currentAccount]);

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.secondContainer}>
          <h1 className={styles.mainHeading}>Multiple Peril Crop Insurance</h1>
          <img src={fvector} className={styles.insuranceImage} />
          <div className={styles.shadow}></div>
          <div className={styles.insuranceDetails}>
            <div className={styles.insuranceInfo}>
              Premium(Rs):{" "}
              <span className={styles.values}>
                {insurance.premium ? insurance.premium.toString() : ""}
              </span>
            </div>
            <div className={styles.insuranceInfo}>
              Duration:{" "}
              <span className={styles.values}>
                {insurance.duration ? insurance.duration.toString() : ""}
              </span>
            </div>
            <div className={styles.insuranceInfo}>
              Payout(Rs):{" "}
              <span className={styles.values}>
                {insurance.payout ? insurance.payout.toString() : ""}
              </span>
            </div>
          </div>
          <div className={styles.selectOptions}>
            <div className={`${styles.inputContainer}`}>
              <label className={`${styles.inputLabel}`}>Location</label>
              <select
                onChange={(e) => setLoc(e.target.value)}
                className={`${styles.input}`}
              >
                {location.map((value, id) => {
                  return <option key={id}>{value}</option>;
                })}
              </select>
            </div>
            <div className={`${styles.inputContainer}`}>
              <label className={`${styles.inputLabel}`}>Crop Type</label>
              <select
                className={`${styles.input}`}
                onChange={(e) => setCropType(e.target.value)}
              >
                <option value="Rabi">Rabi</option>
                <option value="Kharif">Kharif</option>
                {/* <option>Others</option> */}
              </select>
            </div>
          </div>
          <button className={styles.registerBtn} onClick={createInsurance}>
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
