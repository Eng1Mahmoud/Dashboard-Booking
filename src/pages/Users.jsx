import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import profileImage from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
export const Users = () => {
  const [users, setUsers] = useState([]);
  const [showAlertResultDelete, setShowAlertResultDelete] = useState({
    status: false,
    message: "",
  });
  const [userEmailDelete, setUserEmailDelete] = useState("");
  const [showAlertToConfirmeDelete, setShowAlertToConfirmeDelete] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const navigat = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigat("/login");
    } else {
      axios
        .get("http://localhost:4000/getAllUsers", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUsers(res.data.result);
          setLoading(false);
        });
    }
  }, [navigat]);

  const handleDeleteUser = (email) => {
    const token = Cookies.get("token");
    axios
      .delete(`http://localhost:4000/deleteUser/${email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const updatedUsers = users.filter((user) => user.email !== email);
        setUsers(updatedUsers);
        setShowAlertResultDelete({ status: true, message: res.data.message });
        setTimeout(() => {
          setShowAlertResultDelete({ status: false, message: "" });
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const openAlert = (email) => {
    setShowAlertToConfirmeDelete(true);
    setUserEmailDelete(email);
  };
  const completDelet = (email) => {
    setShowAlertToConfirmeDelete(false);
    handleDeleteUser(email);
  };

  const cansleDelet = () => {
    setShowAlertToConfirmeDelete(false);
  };
  return (
    <>
      {showAlertToConfirmeDelete ? (
        <div class="alert alert-danger position-fixed " role="alert">
          <h4>Do you really want to delete this User?</h4>

          <button
            className="btn btn-danger me-1"
            onClick={() => completDelet(userEmailDelete)}
          >
            Delete
          </button>
          <button className="btn btn-secondary" onClick={cansleDelet}>
            Cancel
          </button>
        </div>
      ) : null}
      <div className="container">
        <div className=" py-4">
          {showAlertResultDelete.status ? (
            <div
              className="alert alert-primary position-fixed alert py-3"
              role="alert"
            >
              {showAlertResultDelete.message}
            </div>
          ) : null}
          {loading ? (
            <div className="row py-4 w-100">
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
          ) : users && users.length > 0 ? (
            <div className="row ">
              {users.map((user) => (
                <div className="col-md-6 col-sm-12 " key={user.email}>
                  <div className="card my-3 m-0" key={user.email}>
                    <div className="card-body">
                      <div className="d-flex align-items-center ">
                        <div>
                          <img
                            src={user.image ? user.image : profileImage}
                            alt="User Avatar"
                            className="avatar-user"
                          />
                        </div>
                        <div className="card-text userInfo ps-3">
                          <p>
                            Name: {user.FName} {user.LName}
                          </p>
                          <p>Email: {user.email}</p>
                        </div>
                      </div>

                      <p className="py-2"> All Trips for {user.FName} </p>

                      {user.bookingsHistory.length ? (
                        <div className="allTrips px-1">
                          {user.bookingsHistory.map((ticket, i) => {
                            return (
                              <div
                                className="trips my-2 p-2"
                                key={ticket.date + i}
                              >
                                <p>
                                  Location: {ticket.to} - {ticket.from}
                                </p>
                                <p> Date: {ticket.date}</p>
                                <p> Price: {ticket.seatePrice} </p>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="pb-4">
                          There are no flights previously booked By {user.FName}
                        </div>
                      )}

                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => openAlert(user.email)}
                      >
                        Delete User
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className=" not-found d-flex justify-content-center py-5 ">
              No users found
            </div>
          )}
        </div>
      </div>
    </>
  );
};
