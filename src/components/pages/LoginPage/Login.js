import React from "react";
import { useState } from "react";
import "./Login.css";

function Login() {

    const [hospitalId, setHospitalID] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        sendRequest();
    }

    const sendRequest = async () => {
        await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ hospitalId: hospitalId, password: password }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => res.json())
        .then((res) => {
            localStorage.setItem("token", res.message)
            localStorage.setItem("id", res.id)
            localStorage.setItem("hospitalID", hospitalId)
        })
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

    return (
        <div className="welcome-screen">
            <div className="welcome-screen-content">
            <h1>Welcome to Laboratory Report System</h1>
            <p >Please sign in to access the reporting application.</p>
            </div>
            <form className="login-form" onSubmit={handleLogin} >
                <label htmlFor="username" >Hospital ID:</label>
                <input onChange={(i) => handleHospitalID(i.target.value)} type="text" id="hospitalID" name="hospitalID" placeholder="Enter your hospital id" required />
                <label htmlFor="password">Password:</label>
                <input onChange={(i) => handlePassword(i.target.value)} type="password" id="password" name="password" placeholder="Enter your password" required />
                <button type="submit">Login</button>
            </form>
            <div className="register-area">
                <p>Don't have an account yet?</p>
                <a href="/register"><button className="register-button">Register</button> </a>  
            </div>
        </div>
    );
}

export default Login;