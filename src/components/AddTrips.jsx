import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const AddTrip = () => {
  const [alert, setAlert] = useState({ show: false, message: "" });
  const initialValues = {
    from: "",
    to: "",
    date: "",
    time: "",
    busNumber: "",
    capacity: "",
    priceSeat: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.from) {
      errors.from = "Required";
    }

    if (!values.to) {
      errors.to = "Required";
    }

    if (!values.date) {
      errors.date = "Required";
    } else if (!dayjs(values.date).isValid()) {
      errors.date = "Invalid date format";
    }

    if (!values.time) {
      errors.time = "Required";
    }
    if (!values.busNumber) {
      errors.busNumber = "Required";
    }

    if (!values.capacity) {
      errors.capacity = "Required";
    }

    if (!values.priceSeat) {
      errors.priceSeat = "Required";
    }

    return errors;
  };

  const handleSubmit = (values, { resetForm }) => {
    const formattedDate = dayjs(values.date).format("YYYY-M-D");
    const updatedValues = { ...values, date: formattedDate };
    const token = Cookies.get("token");
    axios
      .post("https://booking-bus.onrender.com/admin/AddTrip", updatedValues, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAlert({ show: true, message: res.data.message });

        setTimeout(() => {
          setAlert({ show: false, message: "" });
        }, 5000);
      });

    resetForm();
  };

  const countries = [
    { name: "Hurghada", title: true },
    { name: "El Nasr Street", title: false },
    { name: "Watanya-HRG", title: false },
    { name: "Al Ahyaa", title: false },
    { name: "Giza/Cairo", title: true },
    { name: "6 October - El Hussary", title: false },
    { name: "Ramsis", title: false },
    { name: "Alexandria", title: true },
    { name: "Sidi Gaber", title: false },
    { name: "Moharam Bek", title: false },
    { name: "Dahab", title: true },
    { name: "Dahab", title: false },
    { name: "Sohag", title: true },
    { name: "Dar ElTeb", title: false },
    { name: "El Ray", title: false },
    { name: "Sharm El Sheikh", title: true },
    { name: "Watanya-SSH", title: false },
    { name: "El Ruwaysat", title: false },
    { name: "Luxor", title: true },
    { name: "Railway station", title: false },
    { name: "Armant", title: false },
    { name: "Qena", title: true },
    { name: "Qift", title: false },
    { name: "Qena ", title: false },
    { name: "Asyout", title: true },
    { name: "Elmoalmien", title: false },
    { name: "ELHILALEY", title: false },
  ];

  return (
    <div className="container addTrip pb-5 pt-3">
      <h1 className="py-5">Add Trip</h1>
      {alert.show ? (
        <div className="alert alert-primary position-fixed alert" role="alert">
          {alert.message}
        </div>
      ) : null}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validate}
      >
        <Form>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="from" className="form-label">
                  From
                </label>
                <Field
                  as="select"
                  className="form-control"
                  aria-label="Default select example"
                  id="from"
                  name="from"
                >
                  <option value="">Select From</option>
                  {countries.map((location, i) => (
                    <option
                      key={location.name + i}
                      value={location.name}
                      disabled={location.title}
                      style={{ background: location.title ? "#dee2e6" : null }}
                    >
                      {location.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="from"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="to" className="form-label">
                  To
                </label>
                <Field
                  as="select"
                  className="form-control"
                  aria-label="Default select example"
                  id="to"
                  name="to"
                >
                  <option value="">Select To</option>
                  {countries.map((location, i) => (
                    <option
                      key={location.name + i}
                      value={location.name}
                      disabled={location.title}
                      style={{ background: location.title ? "#dee2e6" : null }}
                    >
                      {location.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="to"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <Field name="date">
                  {({ field, form }) => (
                    <DatePicker
                      id="date"
                      className="form-control"
                      selected={field.value}
                      minDate={new Date()}
                      onChange={(value) => form.setFieldValue("date", value)}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="time" className="form-label">
                  Time
                </label>
                <Field
                  type="time"
                  className="form-control"
                  id="time"
                  name="time"
                />
                <ErrorMessage
                  name="time"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="busNumber" className="form-label">
                  Bus Number
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="busNumber"
                  name="busNumber"
                />
                <ErrorMessage
                  name="busNumber"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="capacity" className="form-label">
                  Capacity
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="capacity"
                  name="capacity"
                />
                <ErrorMessage
                  name="capacity"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="priceSeat" className="form-label">
                  seat price
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="priceSeat"
                  name="priceSeat"
                />
                <ErrorMessage
                  name="priceSeat"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Trip
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
