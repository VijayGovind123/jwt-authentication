import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}api/login`, data)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.jwttoken);
        if (res.data.user) {
          localStorage.setItem("token", res.data.jwttoken);
          navigate("/protected");
        } else {
          alert("Check your credentials");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
