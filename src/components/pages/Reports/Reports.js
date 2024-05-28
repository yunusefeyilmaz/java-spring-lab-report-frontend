import React from "react";
import Report from "../../object/Report/Report";
import { useState, useEffect } from "react";
import "../../css/table.css";

function ReportsPage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reportList, setReportList] = useState([]);
  const [cacheReportList, setCacheReportList] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const searchList = () => {
    const filteredList = cacheReportList.filter((report) => {
      return (
        report.patient.name.toLowerCase().includes(name.toLowerCase()) &&
        report.patient.surname.toLowerCase().includes(surname.toLowerCase())
      );
    });
    setReportList(filteredList);
  };

  const sortByDate = () => {
    const sortedList = [...reportList];
    sortedList.sort((a, b) => {
      return new Date(a.reportDate) - new Date(b.reportDate);
    });
    if (JSON.stringify(sortedList) === JSON.stringify(reportList)) {
      sortedList.reverse();
    }
    setReportList(sortedList);
  };

  useEffect(() => {
    fetch("/api/reports", {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setReportList(result);
          setCacheReportList(result);
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
          <div>
            <h2>SEARCH</h2>
            <input
              onChange={handleNameChange}
              type="text"
              placeholder="Patient Name"
            />
            <input
              onChange={handleSurnameChange}
              type="text"
              placeholder="Patient Surname"
            />
            <button className="search-button" onClick={searchList}>Search</button>
            <button className="sort-button " onClick={sortByDate}>
              Sort By Date
            </button>
          </div>
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
                <Report
                  id={report.id}
                  fileNumber={report.fileNumber}
                  title={report.diagnosisTitle}
                  detail={report.diagnosisDetails}
                  date={report.reportDate}
                ></Report>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ReportsPage;
