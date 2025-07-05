import React, { useState } from 'react';
import './EmployeeTileView.css';

const EmployeeTileView = ({ employees, role }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="tile-view-section">
      <h2>Employee Tiles</h2>
      <div className="tile-container">
        {employees.map((emp) => (
          <div key={emp.id} className="employee-tile" onClick={() => toggleExpand(emp.id)}>
            <div className="tile-header">
              <strong>{emp.name}</strong> (Age: {emp.age}) - Class {emp.class}
            </div>
            
            {role === 'admin' && (
            <div className="tile-actions">
              <button>Edit</button>
              <button>Flag</button>
              <button>Delete</button>
            </div>
            )}

            {expandedId === emp.id && (
              <div className="tile-details">
                <p><strong>ID:</strong> {emp.id}</p>
                <p><strong>Subjects:</strong> {emp.subjects?.join(', ')}</p>
                <p><strong>Attendance:</strong> {typeof emp.attendance === 'number' ? `${emp.attendance}%` : emp.attendance}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeTileView;
