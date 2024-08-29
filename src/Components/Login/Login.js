

import React, { useState } from "react";
import "../Login/Login.css"
import google from "../../assets/logo-3.png";
import logo from "../../assets/logo-3.png"

const Login = ({ onLogin }) => {
    const userInfo = { email: "test@gmail.com", password: "test@1234" };
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState(""); 
  
    const validateForm = () => {
      const validationErrors = {};
  
      // Email validation
      if (!formData.email.trim()) {
        validationErrors.email = "Email is required";
      } else {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(formData.email)) {
          validationErrors.email = "Email is not valid";
        }
      }
  
      if (!formData.password.trim()) {
        validationErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        validationErrors.password = "Password must contain 6 letters";
      }
  
      return validationErrors;
    };
  
    const handleLogin = (e) => {
      
      e.preventDefault();
      const validationErrors = validateForm();
  
      if (Object.keys(validationErrors).length) {
        setErrors(validationErrors);
      } else {
        if (
          formData.email === userInfo.email &&
          formData.password === userInfo.password
        ) {
          setErrors({});
          onLogin();
        } else {
          setLoginError("Invalid email or password");
        }
      }
      localStorage.setItem("username",formData.email)
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  
      if (name === "email") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "", //
        }));
      }
    };
  
    return (
      <div className="main-card">
        <div>
        <img src={logo} className="sign-in-logo"></img>
        </div>
        <div>
         
        <form className="sign-in-card" autoComplete="off" onSubmit={handleLogin}>
          <div className="sign-title">Sign In</div>
          <div>
            <label>Email</label>
            <div className="sign-in-card-container">
              <input
              id="sign-input"
                type="text"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error-border" : ""}
                autoComplete="off"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#C4C4C4"
                className="email-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                />
              </svg>
            </div>
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <label>Password</label>
            <div className="sign-in-card-container">
              <input
               id="sign-input"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
                required
                className={errors.password ? "error-border" : ""}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#C4C4C4"
                className="email-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
         
          <div>
            <button type="submit" className="sign-in-btn">
              Sign In
            </button>
          </div>
          {loginError && <div className="error">{loginError}</div>}{" "}
          {/* Show login error */}
          <h5 className="horizontal">OR</h5>
          <div>
            <button className="google" onClick={onLogin}>
              <img src={google} alt="google" className="google-img" />
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
      </div>
    );
  };

export default Login
