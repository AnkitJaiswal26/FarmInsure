import styles from "./FarmerDashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {useSafeInsureContext} from "../../Context/SafeInsureContext";
import {useAuth} from '../../Context/AuthContext';
import axios from "../../helpers/axios";
import { ToastContainer, toast } from "react-toastify";

const FarmerDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { connectUsingArcana, currentAccount } = useAuth();

  useEffect(() => {
		connectUsingArcana();
		if (currentAccount) {
			fetchUser();
			fetchFarmInsurances();
		}
	}, [currentAccount]);

	const {
    registerUser,
    fetchUserByAddress,
    fetchUserFarms,
    fetchAllCompanies
   } = useSafeInsureContext();

  const fetchUser = useCallback(async () => {
		try {
			const user = await fetchUserByAddress(currentAccount);
			console.log(user);
      setUser(user);
		} catch (err) {
			console.log("User cannot be fetched");
      toast.error("Could not fetch user");
      navigate("/register");
		}
	});

  const navigateInsurances = () => {
    navigate("/insurances");
  };

  const fetchFarmInsurances = async()=>{
      try{
          const companies = await fetchAllCompanies();
          console.log(companies);
          var result = [];
          const t = await fetchUserFarms();

          // for(let i=0; i< companies.length; i++){
          //   console.log(t);
          //   for(let j=0; j<t.length; j++){
          //     const farm = await fetchFarmById(companies[i], t[j].farmId);
          //     result.push({
          //       userId: farm.userId,
          //       location: farm.location,
          //       landArea: farm.landArea,
          //       cropType: farm.cropType,
          //       ipfsHash: farm.ipfsHash,
          //       fileName: farm.fileName
          //     })
          //   }
          // }
          setFarms(result);
          console.log(companies);
      }catch (err){
        console.log(err);
      }
  }

  const  [farms, setFarms] = useState([]);
  return (
    <>
      <div className={styles.dashboardMain}>
        <div className={styles.secondContainer}>
          <h1 className={styles.mainHeading}>Hello Atharva!</h1>
          <div className={styles.shadow}></div>
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
            <div className={styles.shadow}></div>
            <div className={styles.farmsCards}>
              <div className={styles.farm}>
                <div className={styles.headFarm}>FileName</div>
                <div className={styles.details}>
                  Location: <span className={styles.values}>Latur</span>
                </div>
                <div className={styles.details}>
                  LandArea: <span className={styles.values}>2 acre</span>
                </div>
                <div className={styles.details}>
                  CropType: <span className={styles.values}>Rabi</span>
                </div>
              </div>
              <div className={styles.farm}>
                <div className={styles.headFarm}>FileName</div>
                <div className={styles.details}>
                  Location: <span className={styles.values}>Bhusawal</span>
                </div>
                <div className={styles.details}>
                  LandArea: <span className={styles.values}>1 acre</span>
                </div>
                <div className={styles.details}>
                  CropType: <span className={styles.values}>Kharif</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.viewInsurances}>
            <div className={styles.insuranceHeadBox}>
              <h2 className={styles.insuranceHead}>View My Insurances</h2>
              <button onClick={navigateInsurances} className={styles.button2}>
                Explore Insurances
              </button>
            </div>
            <div className={styles.shadow}></div>
            <div className={styles.insuranceCards}>
              <div className={styles.insurance}>
                {/* uint256 userId;
        string location;
        uint256 landArea;
        string cropType;
        string ipfsHash;
        string fileName; */}
                <div className={styles.headInsurance}>Insurance</div>
                <div className={styles.details}>
                  Period: <span className={styles.values}>1 year</span>
                </div>
                <div className={styles.details}>
                  Premium paid : <span className={styles.values}>1000</span>
                </div>
                <div className={styles.details}>
                  Next Due: <span className={styles.values}>7th April</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FarmerDashboard;
