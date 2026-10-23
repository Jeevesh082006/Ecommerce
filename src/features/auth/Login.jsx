import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    // Simple login for project/demo
    localStorage.setItem(
      "shopkartUser",
      JSON.stringify({
        email,
      })
    );

    const from = location.state?.from || "/";

    navigate(from);
  };

  return (
    <main className="auth-page">

      <div className="login-card">

        <div className="login-header">
          <h1>Welcome Back 👋</h1>
          <p>Login to your ShopKart account</p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>

        <p className="demo-login">
          Demo login: enter any valid email and password.
        </p>

      </div>

    </main>
  );
}

export default Login;