// src/pages/Dashboard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  // simple guard: if no token, bounce back to login
  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (!tok) navigate("/login", { replace: true });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="dash-shell">
      <div className="dash-card">
        <header className="dash-top">
          <h1 className="dash-title">Hi, I’m Karthik Sridhar 👋</h1>
          <button className="btn-logout" onClick={logout}>Logout</button>
        </header>

        <p className="dash-sub">
          Welcome to my Password Reset demo. This small app showcases a complete
          auth flow: register, login, forgot-password email, and reset password —
          all wired to a real backend.
        </p>

        <div className="dash-grid">
          <section className="stack">
            <h3>Purpose</h3>
            <ul>
              <li>Demonstrate a production-style password reset flow.</li>
              <li>Practice secure credential handling with hashing and JWT.</li>
              <li>Show a clean, responsive UI with a sliding login/register layout.</li>
            </ul>
          </section>

          <section className="stack">
            <h3>Tech stack</h3>
            <ul>
              <li><strong>Frontend:</strong> React + Vite, React Router, custom CSS.</li>
              <li><strong>Backend:</strong> Node.js, Express, Mongoose (MongoDB Atlas).</li>
              <li><strong>Auth:</strong> JWT for sessions; bcryptjs for hashing.</li>
              <li>
                <strong>Email:</strong> Nodemailer via Gmail App Password to send reset links.
              </li>
            </ul>
          </section>

          <section className="stack">
            <h3>Flow overview</h3>
            <ol>
              <li>Register → password hashed in a Mongoose hook.</li>
              <li>Login → credentials verified with <code>bcrypt.compare</code>, JWT returned.</li>
              <li>Forgot password → server generates a random token and emails a reset link.</li>
              <li>Reset password → submit new password with token; on success, auto-login.</li>
            </ol>
          </section>
        </div>

        <footer className="dash-foot">
          <p>
            Code is structured with clear controllers/services on the backend and
            simple API helpers on the frontend. UI is responsive and keyboard-friendly.
          </p>
        </footer>
      </div>
    </div>
  );
}
