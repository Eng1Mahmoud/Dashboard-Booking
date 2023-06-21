import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
export const Navbar = () => {

  const closeColaps = ()=>{
    let navbar_toggler = document.querySelector(".navbar-toggler");
    navbar_toggler.click()
  }
  const logOut = ()=>{
    let navbar_toggler = document.querySelector(".navbar-toggler");
    navbar_toggler.click()
    Cookies.remove("token")
  }
  return (
    <header >
      <nav className="navbar navbar-expand-lg  container ">
        <div className="container">
          <Link className="navbar-brand" to="/">
           <img src={logo} alt ="logo" className="img-fluid"/>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="admins" onClick={closeColaps}>
                  Admins
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="users" onClick={closeColaps}>
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="trips" onClick={closeColaps}>
                  Trips
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="login" onClick={logOut} >
                  LogOut
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
