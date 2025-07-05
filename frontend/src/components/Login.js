import React, { useState } from "react";
import axios from "axios";

const Login = ({ setRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      setRole(res.data.role); // ✅ admin or employee
    } catch (err) {
      alert("Login failed. Try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: "5px", padding: "8px" }}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "5px", padding: "8px" }}
      />
      <br />
      <button onClick={handleLogin} style={{ padding: "8px 16px", marginTop: "10px" }}>
        Login
      </button>
    </div>
  );
};

export default Login;
