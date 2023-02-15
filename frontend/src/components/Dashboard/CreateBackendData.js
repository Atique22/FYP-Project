import React, { useRef } from "react";
import axios from "axios";
export default function CreateBackendData() {
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    // a.currentValue
    event.preventDefault();
    const formData = new FormData(formRef.current);

    console.log(formData);
    axios
      .post("http://127.0.0.1:8000/training/", formData)
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.log("Error is:", error);
        console.error("Error:", error);
      });
    console.log(formData);
  };

  return (
    <div>
      <div className="well  m-5">
        <div className="">
          <form
            ref={formRef}
            className="form-horizontal"
            onSubmit={handleSubmit}
            onChange={formRef.current}
          >
            <fieldset>
              <div className="form-group ">
                <label className="col-sm-2 control-label ">Name</label>
                <div className="col-sm-10">
                  <input
                    // ref={a}
                    name="Name"
                    className="form-control"
                    type="text"
                    // value={name}
                    // onChange={(event) => setName(event.target.value)}
                    placeholder="enter name"
                  />
                </div>
              </div>

              <div className="form-group ">
                <label className="col-sm-2 control-label ">Comment</label>

                <div className="col-sm-10">
                  <input
                    name="Comment"
                    className="form-control"
                    type="text"
                    // value={comments}
                    // onChange={(event) => setComments(event.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-2 control-label ">Frame</label>

                <div className="col-sm-10">
                  <input
                    name="Frame"
                    type="file"
                    // value={frame}
                    // onChange={(event) => setFrame(event.target.files[0])}
                  />
                </div>
              </div>

              <div className="form-group ">
                <label className="col-sm-2 control-label ">Middle</label>

                <div className="col-sm-10">
                  <input
                    name="Middle"
                    className="form-control"
                    type="number"
                    // value={middle}
                    // onChange={(event) => setMiddle(event.target.value)}
                    defaultValue={0}
                  />
                </div>
              </div>

              <div className="form-group ">
                <label className="col-sm-2 control-label ">Edge</label>

                <div className="col-sm-10">
                  <input
                    name="Edge"
                    className="form-control"
                    type="number"
                    // value={edge}
                    // onChange={(event) => setEdge(event.target.value)}
                    defaultValue={0}
                  />
                </div>
              </div>

              <div className="form-group ">
                <label className="col-sm-2 control-label ">Missed</label>

                <div className="col-sm-10">
                  <input
                    name="Missed"
                    className="form-control"
                    type="number"
                    // value={missed}
                    // onChange={(event) => setMissed(event.target.value)}
                    defaultValue={0}
                  />
                </div>
              </div>

              <div className="mt-2 form-actions">
                <button className="btn btn-primary js-tooltip" type="submit">
                  POST
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
