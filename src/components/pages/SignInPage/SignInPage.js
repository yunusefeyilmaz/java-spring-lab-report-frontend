import React from "react";
import "./SignInPage.css";

function Home() {
    return (
        <div className="welcome-screen">
            <div className="welcome-screen-content">
            <h1>Welcome to Laboratory Report System</h1>
            <p >Please sign in to access the reporting application.</p>
            </div>
            
            <form className="login-form">
                <label htmlFor="username">Hospital ID:</label>
                <input type="text" id="username" name="username" placeholder="Enter your hospital id" required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default Home;