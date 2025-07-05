import React, { useState } from 'react';
import './EmployeeTile.css'; // optional for styling

const EmployeeTile = ({ employee }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="employee-tile">
      <div className="tile-basic">
        <h3>{employee.name}</h3>
        <p>Class: {employee.class}</p>
        <p>Attendance: {typeof employee.attendance === 'number' ? `${employee.attendance}%` : employee.attendance}</p>
        <div className="tile-buttons">
          <button>Edit</button>
          <button>Flag</button>
          <button>Delete</button>
        </div>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide Details' : 'Show Full Info'}
        </button>
      </div>

      {showDetails && (
        <div className="tile-details">
          <p><strong>ID:</strong> {employee.id}</p>
          <p><strong>Age:</strong> {employee.age}</p>
          <p><strong>Subjects:</strong> {(employee.subjects || []).join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeTile;
