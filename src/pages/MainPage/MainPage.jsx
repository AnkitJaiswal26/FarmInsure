import React, { useCallback, useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MainPage = () => {
	const navigate = useNavigate();
	const languages = [
		{ value: "en", text: "English" },
		{ value: "hi", text: "Hindi" },
		{ value: "mr", text: "Marathi" },
	];

	const { t } = useTranslation();

	const [lang, setLang] = useState("");

	// This function put query that helps to
	// change the language
	const handleChange = (e) => {
		setLang(e.target.value);
		let loc = "http://localhost:3000/";
		window.location.replace(loc + "?lng=" + e.target.value);
	};

	const [language, setLanguage] = useState("English");

	const handleSubmit = async (e) => {
		e.preventDefault();
		navigate("/register");
	};

	return (
		<div className={styles.mainContainer}>
			<h1 className={styles.mainHeading}>{t("first")}</h1>
			<div className={styles.secondaryHeading}>{t("second")}</div>

			<div className={styles.inputContainer}>
				<select
					className={styles.input}
					//   onChange={(e) => setLanguage(e.target.value)}
					value={lang}
					onChange={handleChange}
				>
					<option>{t("choose")}</option>
					{languages.map((item) => {
						return (
							<option key={item.value} value={item.value}>
								{item.text}
							</option>
						);
					})}
					{/* <option value={"English"}>English</option>
          <option value={"Marathi"}>Marathi</option>
          <option value={"Hindi"}>Hindi</option> */}
					{/* <option>Others</option> */}
				</select>
			</div>
			<button className={styles.registerBtn} onClick={handleSubmit}>
				<>
					{t("next")}
					{/* <ArrowForwardIcon className={styles.arrowForwardIcon} /> */}
				</>
			</button>
		</div>
	);
};

export default MainPage;
