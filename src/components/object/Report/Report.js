import "../../css/button.css";

function Report(props) {
  const { id, fileNumber, image, title, detail, date } = props;
  const imagetext = !image ? "Available" : "Not available";

  const deleteHandler = () => {
    fetch(`/api/reports/${id}`, {
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
      <td>{fileNumber}</td>
      <td>{title}</td>
      <td>{detail}</td>
      <td>{date}</td>
      <td>{imagetext}</td>
      <td>
        <button className="view-button" onClick={() => window.location.href = `report/${id}`}>
          View
        </button>
      </td>
      <td>
        <button className="edit-button" onClick={() => window.location.href = `report/edit/${id}`}>Edit</button>
      </td>
      <td>
        <button className="delete-button" onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
}

export default Report;
