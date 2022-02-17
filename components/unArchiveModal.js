import React, { useState } from "react";
import Modal from "react-modal";
function UnArchiveModal({ item, modalState, setModalState }) {
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
      <div className="card blue-grey darken-1">
        <div className="card-action">
          <a style={{ color: "white" }}>CALL UNARCHIVED</a>
        </div>
      </div>
    </Modal>
  );
}

export default UnArchiveModal;

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
