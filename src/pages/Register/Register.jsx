import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import fvector from "../../images/fvector.jpg";
import ivector from "../../images/ivector.jpg";

const Register = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleRegisterFarmer = async (e) => {
    e.preventDefault();
    navigate("/registerfarmer");
  };

  const handleRegisterInsuranceCompany = async (e) => {
    e.preventDefault();
    navigate("/registercompany");
  };
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.mainHeading}>{t("identity")}</h1>
      <h1 className={styles.secondaryHeading}>{t("register_as")}</h1>
      <div className={styles.buttonOptions}>
        <div className={styles.imagebuttongroups}>
          {/* <div className={styles.img}> */}
          <img className={styles.image1} src={fvector} />
          {/* </div> */}
          <button className={styles.registerBtn} onClick={handleRegisterFarmer}>
            <>
              {t("farmer")}
              {/* <ArrowForwardIcon className={styles.arrowForwardIcon} /> */}
            </>
          </button>
        </div>
        <div className={styles.imagebuttongroups}>
          {/* <div className={styles.img}> */}
          <img className={styles.image2} src={ivector} />
          {/* </div> */}
          <button
            className={styles.registerBtn}
            onClick={handleRegisterInsuranceCompany}
          >
            <>
              {t("insurance")}
              {/* <ArrowForwardIcon className={styles.arrowForwardIcon} /> */}
            </>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Register;
