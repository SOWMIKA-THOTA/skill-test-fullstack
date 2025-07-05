import React from "react";

const Sidebar = () => (
  <div className="sidebar">
    <h3>☰ Menu</h3>
    <ul>
      <li>Dashboard</li>
      <li>
        Employees
        <ul>
          <li>Active</li>
          <li>Archived</li>
        </ul>
      </li>
    </ul>
  </div>
);

export default Sidebar;
