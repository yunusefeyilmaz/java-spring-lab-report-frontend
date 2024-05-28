import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditReportPage.css";

function EditReportPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [patient, setPatient] = useState({});
  const [fileNumber, setFileNumber] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [labasistants, setLabAssistants] = useState("");

  useEffect(() => {
    fetch(`/api/reports/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setFileNumber(data.fileNumber);
          setTitle(data.diagnosisTitle);
          setDetail(data.diagnosisDetails);
          setPatient(data.patient);
          setImage(data.image);
          setDate(data.reportDate);
          setLabAssistants(data.labAssistant);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [id]);

  const handleSave = () => {
    fetch(`/api/reports`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        id: parseInt(id),
        fileNumber,
        diagnosisTitle: title,
        diagnosisDetails: detail,
        patient,
        labAssistant: labasistants,
        image,
        reportDate: date,
      }),
    }).then(() => {
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

  const setName = (value) => {
    setPatient({ ...patient, name: value });
  };
  const setSurname = (value) => {
    setPatient({ ...patient, surname: value });
  };
  const setPatientID = (value) => {
    setPatient({ ...patient, patientID: value });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
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
          value={patient.patientID}
          onChange={(e) => setPatientID(e.target.value)}
        />
        <label htmlFor="name">Patient Name</label>
        <input
          type="text"
          id="name"
          value={patient.name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="surname">Patient Surname</label>
        <input
          type="text"
          id="surname"
          value={patient.surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <label htmlFor="image">Report Image</label>
        <input type="file" id="image" onChange={handleImageChange} />
        <label htmlFor="date">Report Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="action-buttons">
          <button onClick={handleSave} className="save-button">
            Save
          </button>
          <button
            onClick={() => navigate(`/report/${id}`)}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default EditReportPage;
