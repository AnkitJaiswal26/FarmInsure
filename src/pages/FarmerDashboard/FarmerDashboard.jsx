import {useState, useEffect, useCallback} from "react";
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
  const [user, setUser] = useState([]);

  const { connectUsingArcana, currentAccount } = useAuth();

  useEffect(() => {
		connectUsingArcana();
		if (currentAccount) {
			fetchUser();
			fetchFarms();
      fetchInsurances();
		}
	}, [currentAccount]);

	const {
    registerUser,
    fetchUserByAddress,
    fetchUserFarms,
    fetchAllCompanies,
    fetchAllInsurances
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

  const fetchFarms = async()=>{
      try{
          const companies = await fetchAllCompanies();
          console.log(companies);
          const result = await fetchUserFarms();
          setFarms(result);
          console.log(companies);
      }catch (err){
        console.log(err);
      }
  }

  const fetchInsurances = async()=> {
    try{
          const data = await fetchAllInsurances();
          console.log(data);
          setInsurances(data);

    }catch (err){
      console.log(err);
    }
  }

  const navigateToAddFarm=()=>{
    navigate("/addfarm");
  }
  const  [farms, setFarms] = useState([]);
  const  [insurances, setInsurances] = useState([]);

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
              <button className={styles.button2} onClick={navigateToAddFarm}>Add Farm</button>
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

              {farms.length >0 ? (
                farms.map((item,index)=>{
                  <>
                  <div className={styles.farm}>
                    <div className={styles.headFarm}>{item.fileName}</div>
                    <div className={styles.details}>
                      Location: <span className={styles.values}>{item.location}</span>
                    </div>
                    <div className={styles.details}>
                      LandArea: <span className={styles.values}>{item.landArea}</span>
                    </div>
                    <div className={styles.details}>
                      CropType: <span className={styles.values}>{item.cropType}</span>
                    </div>
                  </div>
                  </>
                }
                )
              ):(
                <span className={styles.emptyListMessage}>
                    No Farms found
              </span>)}

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
                { insurances.length >0 ?(
                insurances.map((item,index)=>{
                  return <>

                  <div className={styles.headInsurance}>Insurance</div>
                    <div className={styles.details}>
                      Period: <span className={styles.values}>{item.duration}</span>
                    </div>
                    <div className={styles.details}>
                      Premium paid : <span className={styles.values}>{item.premium}</span>
                    </div>
                    <div className={styles.details}>
                      Next Due: <span className={styles.values}>10th April</span>
                    </div>
                  </>
                })
                ):(
                   <span className={styles.emptyListMessage}>
                   Insurances found
             </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FarmerDashboard;
