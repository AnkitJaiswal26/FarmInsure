import React, { useCallback, useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("English");

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/register")
  };

  return (
      <div className={styles.mainContainer}>
        <h1 className={styles.mainHeading}>Welcome to Farmer's Insurance Application</h1>
        <div className={styles.secondaryHeading}>A Place to get your Insurance quickly, safely and easily!</div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Choose Language</label>
          <select
            className={styles.input}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value={"English"}>English</option>
            <option value={"Marathi"}>Marathi</option>
            <option value={"Hindi"}>Hindi</option>
            {/* <option>Others</option> */}
          </select>
        </div>
        <button className={styles.registerBtn} onClick={handleSubmit}>
            <>
              Next
              {/* <ArrowForwardIcon className={styles.arrowForwardIcon} /> */}
            </>
        </button>
      </div>
  );
};

export default MainPage;
