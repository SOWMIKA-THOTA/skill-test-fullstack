import React from "react";

const EmployeeDetailModal = ({ emp, onClose }) => (
  <div className="modal">
    <h2>{emp.name}</h2>
    <p>Age: {emp.age}</p>
    <p>Class: {emp.class}</p>
    <p>Subjects: {emp.subjects.join(", ")}</p>
    <p>Attendance: {emp.attendance}%</p>
    <button onClick={onClose}>Back</button>
  </div>
);

export default EmployeeDetailModal;
