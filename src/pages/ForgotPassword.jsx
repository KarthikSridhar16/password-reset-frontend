import { useState } from "react";
import { forgotPassword } from "../api";
import "../styles/auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState({ type:"", text:"" });

  const submit = async (e) => {
    e.preventDefault();
    setMsg({ type:"", text:"" });
    try {
      const { data } = await forgotPassword(email);
      setMsg({ type:"ok", text: data.message || "If the email exists, a reset link has been sent." });
    } catch (err) {
      setMsg({ type:"err", text: err.response?.data?.message || "Something went wrong" });
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="single-window">
          <h2 className="title">Forgot password</h2>
          <p className="helper">
            Enter your account email. We’ll email a link to set a new password.
          </p>

          {msg.text && <div className={`notice ${msg.type==="ok" ? "ok" : "err"}`}>{msg.text}</div>}

          <form onSubmit={submit}>
            <label className="input">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>

            <div className="actions">
              <button className="btn" type="submit">Send reset link</button>
            </div>
          </form>

          <div className="footer">
            For security, the message is the same whether the email exists or not.
          </div>
        </div>
      </div>
    </div>
  );
}
