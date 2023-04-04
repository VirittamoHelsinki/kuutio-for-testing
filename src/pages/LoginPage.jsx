import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updatePassword, getAuth, signOut } from "firebase/auth";
import { db, auth } from "../firebase/firebase";
import "../styles/LoginPage.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [register, setRegister] = useState(false);

  return (
    <div className="loginpage-main">
      <div className="welcome-label">
        <label>Tervetuloa</label>
      </div>
      {register ? (
        <div className="loginpage-content">
          <div className="login-content">
            <div className="login-label">
              <label>Rekisteröidy uudeksi käyttäjäksi</label>
            </div>
            <div className="input-field">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-field">
              <input type="password" placeholder="Salasana" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input-field">
              <input type="password" placeholder="Salasana uudestaan" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="login-button">
              <button>Rekisteröidy</button>
            </div>
            <div className="register-label">
              <label>Löytyykö tili?</label>
              <label className="link-label" onClick={() => setRegister(false)}>
                Kirjaudu sisään
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="loginpage-content">
          <div className="login-content">
            <div className="login-label">
              <label>Kirjaudu sisään</label>
            </div>
            <div className="input-field">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-field">
              <input type="password" placeholder="Salasana" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="login-button">
              <button>Kirjaudu</button>
            </div>
            <div className="register-label">
              <label>Eikö ole tiliä?</label>
              <label className="link-label" onClick={() => setRegister(true)}>
                Rekisteröidy nyt
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
