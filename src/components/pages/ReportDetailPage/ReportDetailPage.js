
import React from "react";
import "./ReportDetailPage.css";
import { useNavigate } from "react-router-dom";

function ReportDetailPage() {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/edit-report/123456");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      console.log("Report deleted");
    }
  };
  return (
    <div className="report-detail-content">
      <div className="report-header">
        <h1>Report Detail</h1>
        <div className="action-buttons">
          <button onClick={handleEdit} className="edit-button">Edit</button>
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
      </div>
      <div className="report-detail-item">
        <div className="report-detail">
          <label htmlFor="file-number">File Number</label>
          <span id="file-number">123456</span>
          <label htmlFor="report-title">Report Title</label>
          <span id="report-title">Diagnosis</span>
          <label htmlFor="report-detail-title">Report Detail</label>
          <span id="report-detail-title">Diagnosis Details</span>
          <label htmlFor="report-date">Report Date</label>
          <span id="report-date">2021-09-01</span>
        </div>
      </div>
      <div className="patient-detail">
        <div className="patient-detail-item">
          <label htmlFor="patient-id">Patient ID</label>
          <span id="patient-id">123456</span>
        </div>
        <div className="patient-detail-item">
          <label htmlFor="patient-name">Patient Name</label>
          <span id="patient-name">Yunus Emre</span>
        </div>
      </div>
      <div className="report-image-container">
        <img
          id="report-image"
          src="https://via.placeholder.com/150"
          alt="report-image"
        />
      </div>
    </div>
  );
}

export default ReportDetailPage;
