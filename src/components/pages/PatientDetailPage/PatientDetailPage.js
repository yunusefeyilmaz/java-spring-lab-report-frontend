import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PatientDetailPage.css";

function PatientDetailPage() {
  const [patientID, setPatientID] = useState("123456");
  const [name, setName] = useState("Yunus Emre");
  const [surname, setSurname] = useState("Özdemir");
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Gerçek veriyi fetch ile API'den çekebilirsiniz
    setReports([
      {
        id: "1",
        fileNumber: "001",
        title: "Report 1",
        detail: "Report 1 Detail",
        date: "2021-09-01",
      },
      {
        id: "2",
        fileNumber: "002",
        title: "Report 2",
        detail: "Report 2 Detail",
        date: "2021-10-01",
      },
    ]);
  }, []);

  return (
    <div className="patientDetailContainer">
      <h1>Patient Detail</h1>
      <div className="patientInfo">
        <div className="patientDetailItem">
          <label htmlFor="patientID">Patient ID:</label>
          <span id="patientID">{patientID}</span>
        </div>
        <div className="patientDetailItem">
          <label htmlFor="name">Name:</label>
          <span id="name">{name}</span>
        </div>
        <div className="patientDetailItem">
          <label htmlFor="surname">Surname:</label>
          <span id="surname">{surname}</span>
        </div>
      </div>
      <div className="reportList">
        <h2>Reports</h2>
        <ul>
          {reports.map((report) => (
            <li key={report.fileNumber} className="reportItem">
              <div className="reportInfo">
                <div className="reportField">
                  <label>File Number:</label>
                  <span>{report.fileNumber}</span>
                </div>
                <div className="reportField">
                  <label>Title:</label>
                  <span>{report.title}</span>
                </div>
                <div className="reportField">
                  <label>Detail:</label>
                  <span>{report.detail}</span>
                </div>
                <div className="reportField">
                  <label>Date:</label>
                  <span>{report.date}</span>
                </div>
                <div className="reportField">
                  <Link to={`/report/${report.id}`} className="viewButton">
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

export default PatientDetailPage;
