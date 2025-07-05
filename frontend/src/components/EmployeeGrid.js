import React from 'react';
import '../App.css';

const EmployeeGrid = ({ employees, role }) => {
  return (
    <div className="employee-section">
      <h2>Employee Records</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Class</th>
            <th>Subjects</th>
            <th>Attendance</th>
            {role === 'admin' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {(employees || []).map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.age}</td>
              <td>{emp.class}</td>
              <td>{(emp.subjects || []).join(', ')}</td>
              <td>{typeof emp.attendance === 'number' ? emp.attendance+ '%' : emp.attendance}</td>
              {role ==='admin' && (
                <td>
                  <button style={{ marginRight: '8px'}}>Edit</button>
                  <button>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeGrid;
