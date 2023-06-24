import {useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import login from "../assets/login.png";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import ReactLoading from "react-loading";

const validate = (values) => {
    const errors = {};
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

export const Login = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState({status: false, message: ""});
    const [isLoading, setIsLoading] = useState(false);
    const initialValues = {
        email: "",
        password: ""
    };
    const handleSubmit = (values, {resetForm}) => {
        setIsLoading(true)
        axios.post("https://booking-bus.onrender.com/admin/login", values, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            setAlert({status: true, message: res.data.message});
            setIsLoading(false)
            if (res.data.token) {
                Cookies.set("token", res.data.token);
                navigate("/");
            }

            setTimeout(() => {
                setAlert({status: false, message: ""});
            }, 6000);
        });

        resetForm();
    };
    return (
        <div className="login pt-3 pb-5 px-2 ">
            <div className="container py-5">
                {
                alert.status ? (
                    <div className="alert alert-danger position-fixed alert py-3" role="alert">
                        {
                        alert.message
                    } </div>
                ) : null
            }
                <h1 className="text-center pb-5 pt-2">LogIn To Dashboard
                </h1>
                <div className="row">
                    <div className="image col-md-6 col-sm-12">
                        <img src={login}
                            alt="login"
                            className="w-100 h-100"/>
                    </div>
                    <div className="form col-md-6 col-sm-12 pt-5">
                        <Formik initialValues={initialValues}
                            validate={validate}
                            onSubmit={handleSubmit}>
                            {
                            ({errors, touched}) => (
                                <Form>
                                    <div className="mb-3 mt-3 pt-md-5 pt-sm-0">
                                        <label htmlFor="email" className="form-label">
                                            Email address
                                        </label>
                                        <Field name="email" type="email"
                                            className={
                                                `form-control ${
                                                    touched.email && errors.email ? "is-invalid" : ""
                                                }`
                                            }/>
                                        <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                                    </div>

                                    <div className="my-3 py-3">
                                        <label htmlFor="password" className="form-label">
                                            Password
                                        </label>
                                        <Field name="password" type="password"
                                            className={
                                                `form-control ${
                                                    touched.password && errors.password ? "is-invalid" : ""
                                                }`
                                            }/>
                                        <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                                    </div>

                                    <button type="submit" className="btn btn-primary"
                                        disabled={isLoading}>
                                        {
                                        isLoading ? (
                                            <div className="loading-container">
                                                <ReactLoading type="spin" color="#ffffff"
                                                    height={20}
                                                    width={20}/>
                                                <span className="loading-text">Loading...</span>
                                            </div>
                                        ) : ("Submit")
                                    } </button>


                                </Form>
                            )
                        } </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

