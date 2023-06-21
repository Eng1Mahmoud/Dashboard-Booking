import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {ShowTrips} from "../components/ShowTrips";
import {AddTrip} from "../components/AddTrips"      
export const Trips = () => {
  const [showAdmins, setShowAdmins] = useState(true);
  const navigat = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigat("/login");
    }
  }, [navigat]);

  return (
    <div className="container ">
      <h1 className="text-center py-5">Trips Management</h1>

      <div className="btn-group">
        <button  className={`btn btn-primary ${showAdmins? "active":""}`}  onClick={() => setShowAdmins(true)}>
        Show All Trips
        </button>
        <button className={`btn btn-primary ${!showAdmins? "active":""}`}   onClick={() => setShowAdmins(false)}>
           Add Trips
        </button>
       
      </div>
      <div>{showAdmins ? <ShowTrips /> : <AddTrip />}</div>
    </div>
  );
};
