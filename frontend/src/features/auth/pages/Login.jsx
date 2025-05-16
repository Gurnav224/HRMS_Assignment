import { Link } from "react-router-dom";
import "./auth.css";
import Header from "../components/Header";
import CardLeft from "../components/CardLeft";

const Login = () => {
  return (
    <section className="container">
      <Header />
      <div className="card-container">
        <CardLeft />
        <div className="card-right">
          <h1 className="form-title">Welcome to Dashboard</h1>
          <form action="">

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address <span>*</span>
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
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
                  name="password"
                  placeholder="Password"
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
              <p className="forgot-password">Forgot Password?</p>
            </div>

             <button type="submit" class="login-btn">
                Login
            </button>

            <div class="register-link">
              Already have an account? <Link to={"/"}>Register</Link>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
