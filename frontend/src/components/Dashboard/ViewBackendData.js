import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BackendViewData() {
  const [trainingData, setTrainingData] = useState([]);
  const [editData, setEditData] = useState({});
  const [whichDiv, setWhichDiv] = useState(0);
  const [selectedData, setSelectedData] = useState({});

  const handleOpen = (data, divNo) => {
    console.log("src :");
    setWhichDiv(divNo);
    console.log("frame data: " + data.Frame);
    setSelectedData(data);
  };

  const handleClose = () => {
    console.log("handle close calling");
    setWhichDiv(0);
    setSelectedData(null);
  };

  const handleEdit = (data) => {
    console.log("handle close calling" + data.Comment);
    setEditData(data);
    console.log(editData);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/delete/${id}/`)
      .then((response) => {
        if (response.status === 301) {
          const newLocation = response.get("Location");
          axios.delete(newLocation).then((response) => {
            console.log(response);
          });
        } else {
          console.log(response);
        }
        window.location.reload();
      })
      .catch((error) => {
        console.log("error occurs");
        console.error(error);
      });
  };

  // const handleUpdate = (data) => {
  //   axios
  //     .delete(`http://127.0.0.1:8000/update/${data.id}/`, data)
  //     .then((response) => {
  //       if (response.status === 301) {
  //         const newLocation = response.get("Location");
  //         axios.delete(newLocation).then((response) => {
  //           console.log(response);
  //         });
  //       } else {
  //         console.log(response);
  //       }
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.log("error occurs");
  //       console.error(error);
  //     });
  // };

  useEffect(() => {
    async function getAllTrainingData() {
      try {
        const dataGet = await axios.get("http://127.0.0.1:8000/training/");
        // console.log("student data is: " + students.data);
        setTrainingData(dataGet.data);
      } catch (error) {
        console.log("errors occurs: " + error);
      }
    }
    getAllTrainingData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Link to="/CreateBackendData">
            <button
              type="button"
              className="btn m-2 btn-outline-primary btn-lg"
            >
              Create
            </button>
          </Link>
          <Link to="/BackendViewData">
            <button
              type="button"
              className="btn m-2 btn-outline-success btn-lg"
            >
              View
            </button>
          </Link>

          {/* /////////////////////////////////view frame ///////////////////////////////////// */}
          {whichDiv === 1 && (
            <div className="modal-overlay m-4">
              <div className="modal-content">
                <button onClick={handleClose}>Close</button>
                <img
                  src={selectedData.Frame}
                  alt={selectedData.Frame}
                  height={600}
                />
                <ul className="list-group">
                  <li className="list-group-item">Date: {selectedData.Date}</li>
                  <li className="list-group-item">
                    {" "}
                    Name: {selectedData.Name}
                  </li>
                  <li className="list-group-item">
                    Comment: {selectedData.Comment}
                  </li>
                  <li className="list-group-item">
                    Middle: {selectedData.Middle}
                  </li>
                  <li className="list-group-item">
                    {" "}
                    Missed: {selectedData.Edge}
                  </li>
                  <li className="list-group-item">
                    {" "}
                    Edge: {selectedData.Missed}
                  </li>
                </ul>
              </div>
              <div></div>
            </div>
          )}
          {/* /////////////////////////////////view table///////////////////////////////////// */}
          {whichDiv === 0 && (
            <table className="table table-image">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Frame</th>
                  <th scope="col">Date</th>
                  <th scope="col">Name</th>
                  <th scope="col">comments</th>

                  <th scope="col">Middle</th>
                  <th scope="col">Edge</th>
                  <th scope="col">Missed</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {trainingData.map((trainingData, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{trainingData.id}</th>
                      <td className="w-25">
                        <img
                          src={trainingData.Frame}
                          className="img-fluid img-thumbnail"
                          alt="Frame AI"
                          onClick={() => handleOpen(trainingData, 1)}
                        />
                      </td>
                      <td>{trainingData.Date}</td>
                      <td>{trainingData.Name}</td>
                      <td>{trainingData.Comment}</td>
                      <td>{trainingData.Middle}</td>
                      <td>{trainingData.Edge}</td>
                      <td>{trainingData.Missed}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            handleEdit(trainingData);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() => handleOpen(trainingData, 1)}
                        >
                          View
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => {
                            handleDelete(trainingData.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
