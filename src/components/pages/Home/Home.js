import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";

function Home() {
  const id = localStorage.getItem("id");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [labAssistans, setLabAssistant] = useState([]);
  useEffect(() => {
    fetch("/api/labassistants/" + id, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setLabAssistant(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="welcome-screen">
        <div className="welcome-screen-content">
          <h1 className="welcome-heading">
            Welcome to Laboratory Report System
          </h1>
          <h3 id="welcome-message">{labAssistans.hospitalId}</h3>
          <h3 className="detail-text">
            Hello, {labAssistans.name + " " + labAssistans.surname}
          </h3>
          <h3 className="detail-text">
            You have {labAssistans.reports.length} reports.
          </h3>
          <h3 className="detail-text">
            You can use navbar to change or add reports.
          </h3>
        </div>
      </div>
    );
  }
}

export default Home;
