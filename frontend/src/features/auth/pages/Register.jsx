import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

import CardLeft from "../components/CardLeft";
import Header from "../../../components/Logo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../authSlice";

const Register = () => {
 const [newUser, setNewUser] = useState({
  fullName:"hr_user1",
  email:"hr_user1@gmail.com",
  password:"hr_password1",
  confirm_password:"hr_password1"
 })

 const { loading , error , isAuthenticated } = useSelector((state) => state.auth);
 
 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 const dispatch = useDispatch();

 const navigate = useNavigate()

 const inputChangeHandler = (e) => {
  setNewUser((prev) => ({
    ...prev,
    [e.target.name]:e.target.value
  }))
 }

 const handleFormSubmt = (e) => {
  e.preventDefault();
  dispatch(registerUser(newUser))
 }


 useEffect(() => {
    if(isAuthenticated){
        navigate('/candidates')
    }
 },[isAuthenticated, navigate])

 const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
 }

 const toggleConfirmPasswordVisibility = () => {
  setShowConfirmPassword(!showConfirmPassword);
 }

  return (
    <section className="container">
      <Header />
      <div className="card-container">
        <CardLeft />

        <div className="card-right">
          <h1 className="form-title">Welcome to Dashboard</h1>

          <form onSubmit={handleFormSubmt}>
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">
                Full name<span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Full name"
                name="fullName"
                value={newUser.fullName}
                onChange={inputChangeHandler}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address<span>*</span>
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={newUser.email}
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
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={inputChangeHandler}
                  name="password"
                  required
                />
                <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
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
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirm_password">
                Confirm Password<span>*</span>
              </label>
              <div className="password-field">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  name="confirm_password"
                  value={newUser.confirm_password}
                  onChange={inputChangeHandler}
                  placeholder="Confirm Password"
                  required
                />
                <button type="button" className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
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
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>
            {error && <p className="error">{error}</p>}
            {loading && <p>Loading...</p>}
            <button type="submit" className="btn-register">
              Register
            </button>

            <div className="login-link">
              Already have an account? <Link to={"/login"}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
