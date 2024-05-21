import React from "react";
import { useState } from "react";
import "./CreateReportPage.css";

function CreateReportPage() {
  const [fileNumber, setFileNumber] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [reports, setReports] = useState([]);
  const [patientID, setPatientID] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [image, setImage] = useState("");

  function addReport() {
    fetch("/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileNumber: fileNumber,
        title: title,
        detail: detail,
        date: new Date().toISOString().slice(0, 10),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
       
      });
  }

  return (
    <div className="createReportContainer">
      <h1>Create Report</h1>
      <p className="success"></p>
      <label htmlFor="fileNumber">File Number</label>
      <input
        type="text"
        value={fileNumber}
        onChange={(e) => setFileNumber(e.target.value)}
        placeholder="File Number"
      />
      <label htmlFor="title">Diagnosis Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <label htmlFor="detail">Diagnosis Detail</label>
      <input
        type="text"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        placeholder="Detail"
      />
      <label htmlFor="patientID">Patient ID</label>
      <input
        type="text"
        value={patientID}
        onChange={(e) => {
          const input = e.target.value;
          if (input.length <= 11) {
            setPatientID(input);
          }
        }}
        placeholder="12345678900"
      />
      <label htmlFor="name">Patient Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <label htmlFor="surname">Patient Surname</label>
      <input
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        placeholder="Surname"
      />
      <label htmlFor="image">Report Image</label>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result);
          };
          reader.readAsDataURL(file);
        }}
        placeholder="Image"
      />
      <button onClick={addReport}>Add Report</button>
    </div>
  );
}

export default CreateReportPage;
