import "./Report.css";

function Report(props) {
  const { id, fileNumber, image, title, detail, date } = props;
  const imagetext = image ? "Available" : "Not available";
  return (
    <tr>
      <td>{fileNumber}</td>
      <td>{title}</td>
      <td>{detail}</td>
      <td>{date}</td>
      <td>{imagetext}</td>
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

export default Report;
