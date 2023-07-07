import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState({
    searchIn: "",
  });
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  // Handle input change
  const handleInput = (e) => {
    setSearch({
      ...search,
      searchIn: e.target.value,
    });
    request();
  };

  // Request data from the server
  const request = async () => {
    const trimmedInput = search.searchIn.trim();
    if (search.searchIn !== "" && trimmedInput.length !== 0) {
      const formData = {
        search: search.searchIn,
      };
      try {
        const res = await axios.post(
          "http://localhost/api/search/api.php",
          formData
        );
        if (res.data.error) {
          setError(res.data.error);
        } else {
          setTableData(res.data);
          setError(null);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("Field is Empty");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "50%" }}>
      <div className="text-center mt-5 mb-4">
        <h2>Search</h2>
      </div>
      <input
        className="form-control form-control-lg"
        type="text"
        name="search"
        id="search"
        placeholder="Search..."
        onChange={handleInput}
        autoComplete="off"
      />
      {tableData.length > 0 && !error ? (
        <table className="table table-bordered table-striped mt-5 mb-4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.username}</td>
                <td>{row.email}</td>
                <td>{row.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={`alert-danger mt-5 ${error && "alert"}`} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default App;
