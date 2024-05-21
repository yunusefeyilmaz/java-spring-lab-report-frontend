import "./Patient.css";

function Patient(props) {
  const { id, name, surname, patientID } = props;
  return (
    <tr>
      <td>{patientID}</td>
      <td>{name}</td>
      <td>{surname}</td>
      <td>
        <button class="viewButton" href={id}>
          View
        </button>
      </td>
      <td>
        <button class="editButton">Edit</button>
      </td>
      <td>
        <button class="deleteButton">Delete</button>
      </td>
    </tr>
  );
}

export default Patient;
