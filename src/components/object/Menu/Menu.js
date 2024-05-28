import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

function Menu() {
  const userIsLogged = localStorage.getItem("id");

  if (!userIsLogged) {
    return null; // Don't render the menu if the user is not logged in
  }

  return (
    <nav class="mainMenu">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={{ pathname: "/reports" }}>Reports</Link>
        </li>
        <li>
          <Link to={{ pathname: "/patients" }}>Patients</Link>
        </li>
        <li>
          <Link to={{ pathname: "/report/create" }}>Report Create</Link>
        </li>
        <li className="logout">
          <Link to={{ pathname: "/logout" }}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
