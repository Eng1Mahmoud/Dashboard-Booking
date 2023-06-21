import React from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const ShowTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booked, setBooked] = useState(false);
  const [dataForDeletTrip, setDataForDeletTrip] = useState({});

  const [showAlertResult, setShowAlertResult] = useState({
    status: false,
    message: "",
  });
  const [showAlertToConfirmeDelete, setShowAlertToConfirmeDelete] =
    useState(false);
  const token = Cookies.get("token");
  useEffect(() => {
    axios
      .get("https://booking-bus.onrender.com/admin/getTrips", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTrips(res.data);
        setLoading(false);
      });
  }, [booked, token]);
  //  function to change the status of the seat
  const changeStatusSeat = (data, seatStatus) => {
    if (!seatStatus) {
      axios
        .post("https://booking-bus.onrender.com/admin/book", data, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setShowAlertResult({ status: true, message: res.data.message });
          setBooked(true);
          setTimeout(() => {
            setBooked(false);
            setShowAlertResult({ status: false, message: "" });
          }, 5000);
        });
    }
  };

  // delete trip
  const deleteTrip = (data) => {
    const token = Cookies.get("token");
    console.log(token);
    axios
      .delete(
        `https://booking-bus.onrender.com/admin/deleteTrip/${data.from}/${data.to}/${data.date}/${data.busNumber}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setShowAlertResult({ status: true, message: res.data.message });
        setBooked(true);
        setTimeout(() => {
          setBooked(false);
          setShowAlertResult({ status: false, message: "" });
          setLoading(false);
        }, 5000);
      });
  };
  const openAlert = (data) => {
    setShowAlertToConfirmeDelete(true);
    setDataForDeletTrip(data);
  };
  const completDelet = (data) => {
    setShowAlertToConfirmeDelete(false);
    deleteTrip(dataForDeletTrip);
  };

  const cansleDelet = () => {
    setShowAlertToConfirmeDelete(false);
  };
  return (
    <div className="container">
      {showAlertResult.status ? (
        <div className="alert alert-primary position-fixed " role="alert">
          {showAlertResult.message}
        </div>
      ) : null}

      {showAlertToConfirmeDelete ? (
        <div className="alert alert-danger position-fixed " role="alert">
          <h4>Do you really want to delete this User?</h4>

          <button
            className="btn btn-danger me-1"
            onClick={() => completDelet()}
          >
            Delete
          </button>
          <button className="btn btn-secondary" onClick={cansleDelet}>
            Cancel
          </button>
        </div>
      ) : null}
      {trips.length > 0 ? (
        <h1 className="py-4">Avilabil Trips</h1>
      ) : (
        <div
          style={{ height: "300px" }}
          className="py-5 d-flex justify-content-center align-items-center"
        >
          <h1 className="py-5 text-center">There are no current flights</h1>
        </div>
      )}

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
      ) : (
        <div className="row">
          {trips.map((trip, i) => {
            return (
              <div className="col-md-6 col-sm-12 my-2 " key={i}>
                <div className="trip p-4 ">
                  <p>
                    <strong>From </strong> {trip.from}
                    <strong> To </strong> {trip.to}
                  </p>
                  <p>Date {trip.date}</p>
                  <div className="row">
                    {trip.bus.map((bus, i) => {
                      return (
                        <div className="col-12 " key={i}>
                          <div className="bus  p-md-3 p-sm-1">
                            <div
                              className="deleteIcon d-flex justify-content-center align-items-center"
                              onClick={() =>
                                openAlert({
                                  from: trip.from,
                                  to: trip.to,
                                  date: trip.date,
                                  busNumber: bus.number,
                                })
                              }
                            >
                              <FaTrash className="icon" color="red" />
                            </div>
                            <div className="p-3">
                              <p>Bus Number {bus.number}</p>
                              <p>Bus Time {bus.time}</p>
                              <p>Bus Price {bus.price}</p>
                            </div>

                            <div className="d-flex seatsContainer justify-content-center">
                              {bus.seats.map((seat, i) => {
                                return (
                                  <button
                                    onClick={() =>
                                      changeStatusSeat(
                                        {
                                          from: trip.from,
                                          to: trip.to,
                                          date: trip.date,
                                          seatNumber: seat.seatNumber,
                                          busNumber: bus.number,
                                        },
                                        seat.status
                                      )
                                    }
                                    className="seat"
                                    key={i}
                                    style={{
                                      background: seat.status ? "red" : "blue",
                                      color: "white",
                                      cursor: seat.status ? "not-allowed" : "",
                                    }}
                                  >
                                    {seat.seatNumber}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
