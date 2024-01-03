import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Protected() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [filename, setFilename] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token generated", token);
    if (token) {
      axios
        .get(`${process.env.REACT_APP_API_KEY}api/user`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          console.log("resonse secret data", response.data);
          setFilename(response.data.user.profileImage);
        });
    } else {
      // alert("Please login");
      // navigate("/login");
    }
  }, []);

  function logout() {
    localStorage.setItem("token", "");
    navigate("/login");
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>data from Protected Route</h1>
          <h1>{user.user.name}</h1>
          <p>{JSON.stringify(user)}</p>
          <p>File name is: {filename}</p>

          <p>{`${process.env.REACT_APP_API_KEY}image/${filename}`}</p>
          <img
            src={`${process.env.REACT_APP_API_KEY}image/${filename}`}
            width="400"
            alt="profile"
          />
          <button onClick={logout}>Log Out</button>
        </div>
      ) : (
        <div>
          <Link to="/login">lOGIN</Link>
          <h1>You are not logged in </h1>
        </div>
      )}
    </div>
  );
}
export default Protected;
