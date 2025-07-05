import React, { useEffect, useState } from 'react';
import AddOrUpdateEmployee from './components/AddOrUpdateEmployee';
import EmployeeGrid from './components/EmployeeGrid';
import EmployeeTile from './components/EmployeeTile';
import EmployeeTileView from './components/EmployeeTileView';
import Login from './components/Login';

import Header from './components/Header';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [role, setRole] = useState(null); 
  
  useEffect(() => {
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          {
            employees {
              id
              name
              age
              class
              subjects
              attendance
            }
          }
        `
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.employees) {
          setEmployees(result.data.employees);
        } else {
          console.error("Data format error:", result);
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  if(!role) {
    return <Login setRole={setRole} />;
  }

 return (
  <div className="app-container">
    <Header />
    <h1>Skill Test - Full Stack App</h1>

    {role === 'admin' && (
      <div className="employee-section">
        <AddOrUpdateEmployee role={role} />
      </div>
    )}

    <div className="employee-section">
      <EmployeeGrid employees={employees} role={role} />
    </div>

    <div className="employee-section">
      <EmployeeTileView employees={employees} role={role} />
    </div>
  </div>
);

}

export default App;