import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Login.module.css";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = function (e) {
    e.preventDefault();
    console.log("clicked");

    if (!email || !password) return;

    login(email, password);
  };

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated]
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
