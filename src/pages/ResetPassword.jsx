import { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../api";
import "../styles/auth.css";

export default function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState({ type:"", text:"" });

  const submit = async (e) => {
    e.preventDefault();
    setMsg({ type:"", text:"" });
    try {
      const { data } = await resetPassword(token, newPassword);
      localStorage.setItem("token", data.token);
      setMsg({ type:"ok", text: "Password has been reset. You’re logged in now." });
    } catch (err) {
      setMsg({ type:"err", text: err.response?.data?.message || "Could not reset password" });
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="single-window">
          <h2 className="title">Set a new password</h2>
          <p className="helper">Choose a strong password you haven’t used before.</p>

          {msg.text && <div className={`notice ${msg.type==="ok" ? "ok":"err"}`}>{msg.text}</div>}

          <form onSubmit={submit}>
            <label className="input">
              <span>New password</span>
              <input
                type="password"
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                required
              />
            </label>

            <div className="actions">
              <button className="btn" type="submit">Update password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
