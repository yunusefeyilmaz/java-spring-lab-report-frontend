import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditReportPage.css";

function EditReportPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fileNumber, setFileNumber] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [patientID, setPatientID] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetch(`/api/reports/${id}`)
      .then(response => response.json())
      .then(data => {
        setFileNumber(data.fileNumber);
        setTitle(data.title);
        setDetail(data.detail);
        setPatientID(data.patientID);
        setName(data.name);
        setSurname(data.surname);
        setImage(data.image);
        setDate(data.date);
      });
  }, [id]);

  const handleSave = () => {
    fetch(`/api/reports/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileNumber,
        title,
        detail,
        patientID,
        name,
        surname,
        image,
        date,
      }),
    })
    .then(response => response.json())
    .then(() => {
      navigate(`/report/${id}`);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="edit-report-container">
      <h1>Edit Report</h1>
      <label htmlFor="fileNumber">File Number</label>
      <input
        type="text"
        id="fileNumber"
        value={fileNumber}
        onChange={(e) => setFileNumber(e.target.value)}
      />
      <label htmlFor="title">Diagnosis Title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="detail">Diagnosis Detail</label>
      <input
        type="text"
        id="detail"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      />
      <label htmlFor="patientID">Patient ID</label>
      <input
        type="text"
        id="patientID"
        value={patientID}
        onChange={(e) => setPatientID(e.target.value)}
      />
      <label htmlFor="name">Patient Name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="surname">Patient Surname</label>
      <input
        type="text"
        id="surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <label htmlFor="image">Report Image</label>
      <input
        type="file"
        id="image"
        onChange={handleImageChange}
      />
      <label htmlFor="date">Report Date</label>
      <input
        type="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div className="action-buttons">
        <button onClick={handleSave} className="save-button">Save</button>
        <button onClick={() => navigate(`/report/${id}`)} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
}

export default EditReportPage;
