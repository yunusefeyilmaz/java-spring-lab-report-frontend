import React from "react";
import Report from "../../object/Report/Report";
import { useState, useEffect } from "react";
import "./ReportsPage.css";

function ReportsPage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reportList, setReportList] = useState([]);
  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setReportList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Reports</h1>
        <div class="reportTableContainer">
        <table class="reportTable">
          <thead>
            <tr>
              <th>File Number</th>
              <th>Title</th>
              <th>Detail</th>
              <th>Date</th>
              <th>Report Image</th>
              <th>View</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {reportList.map((report) => (
            <Report id={report.id} fileNumber={report.fileNumber} 
            title={report.diagnosisTitle} detail={report.diagnosisDetails} 
            date={report.reportDate}></Report>
          ))}
          </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ReportsPage;