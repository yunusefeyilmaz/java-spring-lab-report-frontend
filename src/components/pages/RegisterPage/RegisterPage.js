import React from "react";
import "./Register.css";
import { useState } from "react";

function Register() {
  const [hospitalId, setHospitalID] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");


  const handleRegister= (e) => {
      e.preventDefault();
      sendRequest();
  }
  const sendRequest = async () => {
    await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({name:name,surname:surname , hospitalId: hospitalId, password: password }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => res.json())
    .catch((err) => console.log(err)).then(() => {
        window.location.href = "/";
    });
}

const handleHospitalID = (value) => {
    setHospitalID(value);        
}
const handlePassword = (value) => {
    setPassword(value);
}
const handleName = (value) => {
  setName(value);
}
const handleSurname = (value) => {
  setSurname(value);
}

  return (
    <div className="welcome-screen">
      <div className="welcome-screen-content">
        <h1>Welcome to Laboratory Report System</h1>
        <p>Please register to create an account.</p>
      </div>
      <form className="register-form" onSubmit={handleRegister}>
        <label htmlFor="hospitalId">Hospital ID:</label>
        <input onChange={(i) => handleHospitalID(i.target.value)} type="text" id="hospitalId" name="hospitalId" placeholder="Enter your hospital ID" required />
        
        <label htmlFor="name">Name:</label>
        <input onChange={(i) => handleName(i.target.value)} type="text" id="name" name="name" placeholder="Enter your name" required />
        
        <label htmlFor="surname">Surname:</label>
        <input onChange={(i) => handleSurname(i.target.value)} type="text" id="surname" name="surname" placeholder="Enter your surname" required />

        <label htmlFor="password">Password:</label>
        <input onChange={(i) => handlePassword(i.target.value)} type="password" id="password" name="password" placeholder="Enter your password" required />
        <button type="submit">Register</button>
      </form>
      <div className="login-area">
        <p>Already have an account?</p>
        <a href="/login">
          <button className="login-button">Login</button>
        </a>
      </div>
    </div>
  );
}

export default Register;
