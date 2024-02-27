// DeleteConfirmationModal.js
import React from 'react';

import "./Product.css"


function DeleteModal({ isOpen, onCancel, onConfirm }) {
  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
        <h2 className="modal-heading">Are you sure you want to delete?</h2>
  <button className="confirm-button" onClick={onConfirm}>Confirm</button>
  <button className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    )
  );
}

export default DeleteModal;

