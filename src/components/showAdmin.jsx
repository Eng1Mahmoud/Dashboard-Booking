import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const ShowAdmin = () => {
  const [emailAdmain, setEmailAdmin] = useState("");
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlertResultDelete, setShowAlertResultDelete] = useState({
    status: false,
    message: "",
  });
  const [showAlertToConfirmeDelete, setShowAlertToConfirmeDelete] = useState(false);
  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get("https://booking-bus.onrender.com/admin/getAdmins", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAdmins(res.data);
        setLoading(false);
      });
  }, []);

  const handleDeleteAdmin = (email) => {
    const token = Cookies.get("token");
    axios
      .delete(`https://booking-bus.onrender.com/admin/deleteAdmin/${email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAdmins(res.data.admins);
        setShowAlertResultDelete({ status: true, message: res.data.message });
        setTimeout(() => {
          setShowAlertResultDelete({ status: false, message: "" });
        }, 6000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openAlert = (email) => {
    setShowAlertToConfirmeDelete(true);
    setEmailAdmin(email);
  };
  const completDelet = (email) => {
    setShowAlertToConfirmeDelete(false);
    handleDeleteAdmin(email);
  };

  const cansleDelet = () => {
    setShowAlertToConfirmeDelete(false);
  };
  return (
    <>
      {showAlertToConfirmeDelete ? (
        <div className="alert alert-danger position-fixed " role="alert">
          <h4>Do you really want to delete this admin?</h4>

          <button
            className="btn btn-danger me-1"
            onClick={() => completDelet(emailAdmain)}
          >
            Delete
          </button>
          <button className="btn btn-secondary" onClick={cansleDelet}>
            Cancel
          </button>
        </div>
      ) : null}

      {showAlertResultDelete.status ? (
        <div
          className="alert alert-danger position-fixed alert py-3"
          role="alert"
        >
          {showAlertResultDelete.message}
        </div>
      ) : null}
      <div>
        <h2 className="py-4">Current Admins</h2>
        <div className="row ">
          {loading ? (
            <div className="row py-4 justify-content-center">
              <div className="col-md-6 col-sm-12">
                <div className="spinner-grow" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="spinner-grow" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          ) : admins && admins.length > 0 ? (
            admins.map((admin) => (
              <div className="col-md-6 col-sm-12" key={admin.email}>
                <div className="card my-3" key={admin.email}>
                  <div className="card-body">
                    <p className="card-text">Name: {admin.name}</p>
                    <p className="card-text">Email: {admin.email}</p>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => openAlert(admin.email)}
                    >
                      Delete Admin
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className=" not-found d-flex justify-content-center py-5 ">
              No admins found
            </div>
          )}
        </div>
      </div>
    </>
  );
};
