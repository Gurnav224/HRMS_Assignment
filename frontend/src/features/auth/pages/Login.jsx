import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../authSlice";
import "./auth.css";
import Header from "../../../components/Logo";
import CardLeft from "../components/CardLeft";

const Login = () => {
  const { loading , error , isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if(isAuthenticated){
        navigate('/candidates')
    }
 },[isAuthenticated, navigate])

 const [loginCredentials, setLoginCredentials] = useState({
  email:"hr_user1@gmail.com",
  password:"hr_password1"
 })

 const inputChangeHandler = (e) => {
  setLoginCredentials((prev) => ({
    ...prev,
    [e.target.name]:e.target.value
  }))
 }

 const handleFormSubmit = (e) => {
  e.preventDefault();
  dispatch(loginUser(loginCredentials))
 }

  return (
    <section className="container">
      <Header />
      <div className="card-container">
        <CardLeft />
        <div className="card-right">
          <h1 className="form-title">Welcome to Dashboard</h1>
          <form onSubmit={handleFormSubmit}>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address <span>*</span>
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                value={loginCredentials.email}
                onChange={inputChangeHandler}
                placeholder="Email Address"
                required
              />
            </div>

           <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password<span>*</span>
              </label>
              <div className="password-field">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={loginCredentials.password}
                  onChange={inputChangeHandler}
                  placeholder="Password"
                  required
                />
                <div className="password-toggle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="#5a0099"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </div>
              </div>
              <p className="forgot-password">Forgot Password?</p>
            </div>
              {error && <p className="error">{error}</p>}
              {loading && <p>Loading...</p>}
             <button type="submit" className="login-btn">
                Login
            </button>

            <div className="register-link">
              Already have an account? <Link to={"/"}>Register</Link>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
