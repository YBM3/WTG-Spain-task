import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setEmail, email, setCurrentUser }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      const user = await response.json();
      setEmail(user.email);
      setCurrentUser(email)
      navigate("/");
    } else {
      const errorData = await response.json();
      console.error(errorData.message);
      setError(errorData.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="p-5 border rounded bg-light w-50">
        <h2 className="text-center mb-4">Login</h2>
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
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary mt-3">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
