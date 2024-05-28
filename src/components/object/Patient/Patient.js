import "../../css/button.css";

function Patient(props) {
  const { id, name, surname, patientID } = props;

  const deleteHandler = () => {
    fetch(`/api/patients/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }).then(() => {
      window.location.reload();
    });
  }
  return (
    <tr>
      <td>{patientID}</td>
      <td>{name}</td>
      <td>{surname}</td>
      <td>
        <button className="view-button" onClick={() => window.location.href = `patient/${id}`}>
          View
        </button>
      </td>
      <td>
        <button className="edit-button">Edit</button>
      </td>
      <td>
        <button className="delete-button" onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
}

export default Patient;
