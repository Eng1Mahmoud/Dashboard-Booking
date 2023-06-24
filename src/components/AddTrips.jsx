import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import axios from "axios";
import DatePicker from "react-datepicker";
import ReactLoading from "react-loading";
import "react-datepicker/dist/react-datepicker.css";

export const AddTrip = () => {
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    from: "",
    to: "",
    date: "",
    time: "",
    busNumber: "",
    capacity: "",
    priceSeat: ""
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

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    const formattedDate = dayjs(values.date).format("YYYY-M-D");
    const updatedValues = {
      ...values,
      date: formattedDate
    };

    const token = Cookies.get("token");
    try {
      const res = await axios.post(
        "https://booking-bus.onrender.com/admin/AddTrip",
        updatedValues,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      setAlert({ show: true, message: res.data.message });
      setTimeout(() => {
        setAlert({ show: false, message: "" });
      }, 5000);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
    resetForm();
  };

  const countries = [
    // Country data here
  ];

  return (
    <div className="container addTrip pb-5 pt-3">
      <h1 className="py-5">Add Trip</h1>
      {alert.show && (
        <div className="alert alert-primary position-fixed alert" role="alert">
          {alert.message}
        </div>
      )}
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
        <Form>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="from" className="form-label">
                  From
                </label>
                <Field as="select" className="form-control" aria-label="Default select example" id="from" name="from">
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
                <ErrorMessage name="from" component="div" className="text-danger" />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="to" className="form-label">
                  To
                </label>
                <Field as="select" className="form-control" aria-label="Default select example" id="to" name="to">
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
                <ErrorMessage name="to" component="div" className="text-danger" />
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
                <ErrorMessage name="date" component="div" className="text-danger" />
              </div>
            </div>
            {/* Rest of the form fields */}
          </div>

          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? (
              <div className="loading-container">
                <ReactLoading type="spin" color="#ffffff" height={20} width={20} />
                <span className="loading-text">Loading...</span>
              </div>
            ) : (
              "Add Trip"
            )}
          </button>
        </Form>
      </Formik>
    </div>
  );
};
