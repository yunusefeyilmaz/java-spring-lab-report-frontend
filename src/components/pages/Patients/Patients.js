import React from "react";
import Patient from "../../object/Patient/Patient";
import { useState, useEffect } from "react";
import "../../css/table.css";

function PatientsPage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [patientsList, setPatientsList] = useState([]);
  const [cachePatientsList, setCachePatientsList] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const searchList = () => {
    const filteredList = cachePatientsList.filter((patient) => {
      return (
        patient.name.toLowerCase().includes(name.toLowerCase()) &&
        patient.surname.toLowerCase().includes(surname.toLowerCase())
      );
    });
    setPatientsList(filteredList);
  };

  useEffect(() => {
    fetch("/api/patients", {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPatientsList(result);
          setCachePatientsList(result);
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
        <h1>Patients</h1>
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
          </div>
          <table class="reportTable">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {patientsList.map((patient) => (
                <Patient
                  id={patient.id}
                  name={patient.name}
                  surname={patient.surname}
                  patientID={patient.patientID}
                  reports={patient.reports}
                ></Patient>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PatientsPage;
