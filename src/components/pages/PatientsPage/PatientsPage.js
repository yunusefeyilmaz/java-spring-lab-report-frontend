import React from "react";
import Patient from "../../object/Patient/Patient";
import { useState, useEffect } from "react";
import "./PatientsPage.css";

function PatientsPage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [patientsList, setPatientsList] = useState([]);
  useEffect(() => {
    fetch("/api/patients")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPatientsList(result);
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
            <Patient id={patient.id} name={patient.name} 
            surname={patient.surname} patientID={patient.patientID} 
            reports={patient.reports}></Patient>
          ))}
          </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PatientsPage;