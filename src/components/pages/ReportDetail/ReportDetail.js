import React, { useEffect, useState } from "react";
import "./ReportDetailPage.css";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/button.css";

function ReportDetailPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [report, setReport] = useState({});
  const [imageSrc, setImageSrc] = useState("");

  const { id } = useParams();
  const handleEdit = () => {
    navigate("/report/edit/" + id);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      console.log("Report deleted");
    }
  };

  const convertBase64ToImage = (base64String) => {
    const image = `data:image/jpeg;base64, ${base64String}`;
    return image;
  };
  useEffect(() => {
    fetch(`/api/reports/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setReport(result);
          setImageSrc(convertBase64ToImage(result.image));
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
      <div className="report-detail-content">
        <div className="report-header">
          <h1>Report Detail</h1>
          <div className="action-buttons">
            <button onClick={handleEdit} className="edit-button">
              Edit
            </button>
            <button onClick={handleDelete} className="delete-button">
              Delete
            </button>
          </div>
        </div>
        <div className="report-detail-item">
          <div className="report-detail">
            <label htmlFor="file-number">File Number</label>
            <span id="file-number">{report.fileNumber}</span>
            <label htmlFor="report-title">Report Title</label>
            <span id="report-title">{report.diagnosisTitle}</span>
            <label htmlFor="report-detail-title">Report Detail</label>
            <span id="report-detail-title">{report.diagnosisDetails}</span>
            <label htmlFor="report-date">Report Date</label>
            <span id="report-date">{report.reportDate}</span>
          </div>
        </div>
        <div className="patient-detail">
          <div className="patient-detail-item">
            <label htmlFor="patient-id">Patient ID</label>
            <span id="patient-id">{report.patient.patientId}</span>
          </div>
          <div className="patient-detail-item">
            <label htmlFor="patient-name">Patient Name</label>
            <span id="patient-name">
              {report.patient.name + " " + report.patient.surname}
            </span>
          </div>
        </div>
        <div className="report-image-container">
          <img id="report-image" src={imageSrc} alt="Report" />
        </div>
      </div>
    );
  }
}

export default ReportDetailPage;
