import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!user.username  || !user.password) {
      setError("All fields are required.");
      setSuccess(false);
      return;
    }
    if (user.password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess(false);
      return;
    }
    navigate('/')

    // Save user to localStorage
    localStorage.setItem("registeredUser", JSON.stringify(user));
    setError("");
    setSuccess(true);

    // Clear form
    setUser({ username: "", email: "", password: "" });
    setConfirmPassword("");
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body">
        <img src="http://digitrac.keydraft.com/images/logos/digitrac_full_logo.png" className="brand-logo" alt="image-logo"/>
          <h2 className="text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            
            <div className="mb-3">
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Username"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
              />
            </div>
            
            <div className="mb-3">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                id="confirm-password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <p>Already U Have Account <a href="/">Login</a></p>
            {error && <div className="text-danger mb-3">{error}</div>}
            {success && (
              <div className="text-success mb-3">
                Registration successful! You can now log in.
              </div>
            )}
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
