import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import adminImage from "../assets/admin.png";
export const Home = () => {
  const navigat = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigat("/login");
    }
  }, [navigat]);
  return (
    <div className="home container py-5">
      <div className="row align-items-center">
        <div className="col-md-6 col-sm-12">
          <div className="welcom">
            <h1 className="welcome container">
              Welcome You Are In Tazkarty Admin Dashboard
            </h1>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="img">
            <img src={adminImage} alt="admin" style={{width:"100%",height:"100%"}}/>
          </div>
        </div>
      </div>
    </div>
  );
};
