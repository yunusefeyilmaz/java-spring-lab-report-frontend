import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./PatientDetailPage.css";
import "../../css/button.css";

function PatientDetailPage() {
  const [patient, setPatient] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/patients/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setPatient(result);
          setIsLoaded(true);
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
      <div className="patientDetailContainer">
        <h1>Patient Detail</h1>
        <div className="patientInfo">
          <div className="patientDetailItem">
            <label htmlFor="patientID">Patient ID:</label>
            <span id="patientID">{patient.patientId}</span>
          </div>
          <div className="patientDetailItem">
            <label htmlFor="name">Name:</label>
            <span id="name">{patient.name}</span>
          </div>
          <div className="patientDetailItem">
            <label htmlFor="surname">Surname:</label>
            <span id="surname">{patient.surname}</span>
          </div>
        </div>
        <div className="reportList">
          <h2>Reports</h2>
          <ul>
            {patient.reports &&
              patient.reports.map((report) => (
                <li key={report.fileNumber} className="reportItem">
                  <div className="reportInfo">
                    <div className="reportField">
                      <label>File Number:</label>
                      <span>{report.fileNumber}</span>
                    </div>
                    <div className="reportField">
                      <label>Title:</label>
                      <span>{report.diagnosisTitle}</span>
                    </div>
                    <div className="reportField">
                      <label>Detail:</label>
                      <span>{report.diagnosisDetails}</span>
                    </div>
                    <div className="reportField">
                      <label>Date:</label>
                      <span>{report.reportDate}</span>
                    </div>
                    <div className="reportField">
                      <Link to={`/report/${report.id}`} className="view-button">
                        View
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default PatientDetailPage;
