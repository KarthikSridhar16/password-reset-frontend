// src/pages/auth.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login, register } from "../api";
import "../styles/auth.css";

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialMode = useMemo(() => {
    const m = new URLSearchParams(location.search).get("mode");
    return m === "register" ? "register" : "login";
  }, [location.search]);

  const [mode, setMode] = useState(initialMode);
  const [msg, setMsg] = useState({ type: "", text: "" });

 
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");


  const [regName, setRegName] = useState("");
  const [regGender, setRegGender] = useState("other");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  useEffect(() => {
    setMode(initialMode);
    document.documentElement.style.setProperty("--x", initialMode === "login" ? "0%" : "-50%");
    setMsg({ type: "", text: "" });
  }, [initialMode]);

  const switchTo = (m) => {
    setMode(m);
    setMsg({ type: "", text: "" });
    document.documentElement.style.setProperty("--x", m === "login" ? "0%" : "-50%");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    try {
      const { data } = await login(loginEmail, loginPassword);
      localStorage.setItem("token", data.token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setMsg({ type: "err", text: err.response?.data?.message || "Login failed" });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    try {
      const payload = {
        name: regName,
        gender: regGender,
        email: regEmail,
        password: regPassword,
      };

      await register(payload);

     
      setLoginEmail(regEmail);      
      setLoginPassword("");         
      setRegName("");                
      setRegGender("other");
      setRegEmail("");
      setRegPassword("");

      switchTo("login");
      setMsg({ type: "ok", text: "Account created successfully. Please log in." });
      // ⬆️ ⬆️ changes end

    } catch (err) {
      setMsg({ type: "err", text: err.response?.data?.message || "Registration failed" });
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card" data-mode={mode}>
        <div className="slide-panel">
          {mode === "login" ? (
            <div>
              <h3>New here?</h3>
              <p>Create an account to get started.</p>
              <button className="panel-btn" type="button" onClick={() => switchTo("register")}>
                Go to Register →
              </button>
            </div>
          ) : (
            <div>
              <h3>Welcome back!</h3>
              <p>Already have an account? Log in instead.</p>
              <button className="panel-btn" type="button" onClick={() => switchTo("login")}>
                ← Back to Login
              </button>
            </div>
          )}
        </div>

        <div className="mobile-switch-wrap">
          <button
            type="button"
            className="mobile-switch"
            onClick={() => switchTo(mode === "login" ? "register" : "login")}
            aria-label={mode === "login" ? "Switch to Register" : "Switch to Login"}
          >
            {mode === "login" ? "Register →" : "← Login"}
          </button>
        </div>

        <div className="forms-window">
          <div className="forms-track" style={{ "--x": mode === "login" ? "0%" : "-50%" }}>
            {/* LOGIN */}
            <form className="form-pane" onSubmit={handleLogin}>
              <h2 className="title">Login</h2>
              <p className="helper">Welcome back. Enter your credentials to continue.</p>

              {msg.text && mode === "login" && (
                <div className={`notice ${msg.type === "ok" ? "ok" : "err"}`}>{msg.text}</div>
              )}

              <label className="input">
                <span>Email</span>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="input">
                <span>Password</span>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </label>

              <div className="actions">
                <button className="btn" type="submit">Login</button>
              </div>

              <div className="footer">
                Forgot your password? <Link to="/forgot-password" className="link">Reset it here</Link>
              </div>
            </form>

            {/* REGISTER */}
            <form className="form-pane" onSubmit={handleRegister}>
              <h2 className="title">Create account</h2>
              <p className="helper">New here? Register and we’ll sign you in instantly.</p>

              {msg.text && mode === "register" && (
                <div className={`notice ${msg.type === "ok" ? "ok" : "err"}`}>{msg.text}</div>
              )}

              <label className="input">
                <span>Name</span>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </label>

              <label className="input">
                <span>Gender</span>
                <select value={regGender} onChange={(e) => setRegGender(e.target.value)} required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </label>

              <label className="input">
                <span>Email</span>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="input">
                <span>Password</span>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  required
                />
              </label>

              <div className="actions">
                <button className="btn" type="submit">Create account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
