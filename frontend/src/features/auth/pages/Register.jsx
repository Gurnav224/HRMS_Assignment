import { Link } from "react-router-dom";
import "./auth.css";

import CardLeft from "../components/CardLeft";
import Header from "../components/Header";

const Register = () => {
  return (
    <section class="container">
      <Header />
      <div class="card-container">
        <CardLeft />

        <div class="card-right">
          <h1 class="form-title">Welcome to Dashboard</h1>

          <form>
            <div class="form-group">
              <label class="form-label" htmlFor="fullName">
                Full name<span>*</span>
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Full name"
                name="fullName"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label" htmlFor="email">
                Email Address<span>*</span>
              </label>
              <input
                type="email"
                class="form-control"
                name="email"
                placeholder="Email Address"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label" htmlFor="password">
                Password<span>*</span>
              </label>
              <div class="password-field">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  name="password"
                  required
                />
                <div class="password-toggle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="#5a0099"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" htmlFor="confirm_password">
                Confirm Password<span>*</span>
              </label>
              <div class="password-field">
                <input
                  type="password"
                  class="form-control"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  required
                />
                <div class="password-toggle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="#5a0099"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </div>
              </div>
            </div>

            <button type="submit" class="btn-register">
              Register
            </button>

            <div class="login-link">
              Already have an account? <Link to={"/login"}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
