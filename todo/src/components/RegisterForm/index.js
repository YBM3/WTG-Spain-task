import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ setEmail, setCurrentUser }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmailInput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      const user = await response.json();
      setEmail(user.email);
      setCurrentUser(email);
      navigate("/");
    } else {
      const errorData = await response.json();
      setError(errorData.message);
    }
  };

  const handleInputChange = (event) => {
    setEmailInput(event.target.value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="p-5 border rounded bg-light w-50">
        <h2 className="text-center mb-4">Registration</h2>
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              required
              value={email}
              onChange={handleInputChange}
            />
            {error && <p className="text-danger">{error}</p>}
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
