import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (
      storedUser &&
      storedUser.username === credentials.username &&
      storedUser.password === credentials.password
    ) {
      // Navigate to dashboard if credentials match
      navigate("/dash");
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <img
              src="http://digitrac.keydraft.com/images/logos/digitrac_full_logo.png"
              className="brand-logo"
              alt="logo"
            />
            <h2>Login</h2>
            <div className="mb-3">
              <input
                type="text"
                id="username"
                className="form-control"
                value={credentials.username}
                placeholder="UserName"
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                id="password"
                className="form-control"
                value={credentials.password}
                placeholder="Password"
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>
            <div className="last-second-one">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <p>Forget Password</p>
            </div>
            <p>
              You Don't Have Account? <a href="/register">Register</a>
            </p>
            {error && <div className="text-danger mb-3">{error}</div>}
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
