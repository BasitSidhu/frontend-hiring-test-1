import React, { useState } from "react";
import Modal from "react-modal";
import dateFormat from "dateformat";
function CallModal({ item, modalState, setModalState, duration }) {
  return (
    <Modal
      isOpen={modalState}
      onRequestClose={() => setModalState(false)}
      style={modalStyles}
      contentLabel="Call Details"
    >
      <button className="btn btn-danger" onClick={() => setModalState(false)}>
        X
      </button>

      <table className="table table-striped table-hover table-bordered">
        <tbody>
          <tr>
            <th>Call Duration</th>
            <td>{duration}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{item.call_type}</td>
          </tr>
          <tr>
            <th>Call Direction</th>
            <td>{item.direction}</td>
          </tr>
          <tr>
            <th>Through</th>
            <td>{item.via}</td>
          </tr>
          <tr>
            <th>Archived</th>
            <td>{item.is_archived ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>
              {dateFormat(
                Date.parse(item.created_at),
                "dddd, mmmm dS, yyyy, h:MM:ss TT"
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="card blue-grey darken-1">
        <div className="card-action">
          <a style={{ color: "white" }}>
            <strong>From: </strong> {item.from}
          </a>
          <a style={{ color: "white" }}>
            <strong>To: </strong> {item.to}
          </a>
        </div>
      </div>
      <div
        className="card blue-grey darken-1"
        style={{ maxHeight: "130px", overflow: "auto" }}
      >
        <div style={{ color: "white", fontWeight: "bold", marginLeft: "5px" }}>
          {" "}
          NOTES:
        </div>
        {item.notes.map((obj, i) => (
          // eslint-disable-next-line react/jsx-key
          <div className="card-action">
            {"  "}
            <a style={{ color: "white" }}>{i + 1}</a>
            {"  "}
            <a style={{ color: "white" }}>{obj.content}</a>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default CallModal;

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
