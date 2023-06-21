import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddAdmin } from "../components/AddAdmin";
import { ShowAdmin } from "../components/showAdmin";
export const Admin = () => {
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
      <h1 className="text-center py-5">Admins management</h1>

      <div className="btn-group">
        <button  className={`btn btn-primary ${showAdmins? "active":""}`}  onClick={() => setShowAdmins(true)}>
        show All Admins
        </button>
        <button className={`btn btn-primary ${!showAdmins? "active":""}`}   onClick={() => setShowAdmins(false)}>
           Add Admin
        </button>
       
      </div>
      <div>{showAdmins ? <ShowAdmin /> : <AddAdmin />}</div>
    </div>
  );
};
