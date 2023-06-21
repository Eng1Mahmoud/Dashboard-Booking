import { Formik, Form, Field, ErrorMessage } from "formik";
import login from "../assets/login.png";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const AddAdmin = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  return (
    <div className="addAdmin pt-3 pb-5">
      <div className="container py-5">
        {showAlert ? (
          <div
            className="alert alert-primary position-fixed alert"
            role="alert"
          >
            {messageAlert}
          </div>
        ) : null}

        <div className="row">
          <div className="image col-md-6 col-sm-12">
            <img src={login} alt="login" className="w-100 h-100" />
          </div>
          <div className="form col-md-6 col-sm-12 py-4">
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validate={validate}
              onSubmit={(values, { resetForm }) => {
                const token = Cookies.get("token");
                axios
                  .post(
                    "https://booking-bus.onrender.com/admin/addAdmin/",
                    values,
                    {
                      headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((res) => {
                    setShowAlert(true);
                    setMessageAlert(res.data.message);
                    setTimeout(() => {
                      setShowAlert(false);
                    }, 3000);
                  });

                resetForm();
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <Field
                      name="name"
                      type="text"
                      className={`form-control ${
                        touched.name && errors.name ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className={`form-control ${
                        touched.email && errors.email ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Field
                      name="password"
                      type="password"
                      className={`form-control ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Add New Admin
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
