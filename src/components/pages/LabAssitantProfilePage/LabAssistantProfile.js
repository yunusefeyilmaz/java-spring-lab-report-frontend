import React from "react";
import { useState, useEffect } from "react";


function LabAssitantPage(props) {
  const {id} = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [labAssistans,setLabAssistant ] = useState([]);
  useEffect(() => {
    fetch("/api/labasistants/"+id)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setLabAssistant(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  function countReports(){
    return labAssistans.reports.length;
    }
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
        <div>
            <h1>Your Profile</h1>
            <div>
                <h2>Lab Assistant ID: {labAssistans.hospitalID}</h2>
                <h2>Name: {labAssistans.name}</h2>
                <h2>Surname: {labAssistans.surname}</h2>
                <h2>Reports Count: {countReports}</h2>
            </div>
        </div>
      
    );
  }
}

export default LabAssitantPage;