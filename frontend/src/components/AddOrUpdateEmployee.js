import React, { useState } from "react";
import { request } from "graphql-request";

const endpoint = "http://localhost:5000/graphql";

const AddOrUpdateEmployee = () => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    age: "",
    class: "",
    subjects: "",
    attendance: ""
  });

  const [updateForm, setUpdateForm] = useState({
    id: "",
    name: "",
    age: "",
    class: "",
    subjects: "",
    attendance: ""
  });

  const handleChange = (e, isUpdate = false) => {
    const { name, value } = e.target;
    if (isUpdate) {
      setUpdateForm({ ...updateForm, [name]: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const mutation = `
      mutation AddEmployee($id: Int!, $name: String!, $age: Int!, $class: String!, $subjects: [String!]!, $attendance: Float!) {
        addEmployee(id: $id, name: $name, age: $age, class: $class, subjects: $subjects, attendance: $attendance) {
          id
          name
        }
      }
    `;

    const variables = {
      id: parseInt(form.id),
      name: form.name,
      age: parseInt(form.age),
      class: form.class,
      subjects: typeof form.subjects === "string"
        ? form.subjects.split(",").map((s) => s.trim())
        : [],
      attendance: parseFloat(form.attendance),
    };

    console.log("Submitting Add Form:", form);
    console.log("Parsed GraphQL Variables:", variables);

    try {
      const data = await request(endpoint, mutation, variables);
      console.log("Add success:", data);
      alert("Added successfully");

      setForm({
        id: "",
        name: "",
        age: "",
        class: "",
        subjects: "",
        attendance: ""
      });
    } catch (error) {
      console.error("Add error:", error.response?.errors || error.message);
      alert("Add failed");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const mutation = `
      mutation UpdateEmployee($id: Int!, $name: String!, $age: Int!, $class: String!, $subjects: [String!]!, $attendance: Float!) {
        updateEmployee(id: $id, name: $name, age: $age, class: $class, subjects: $subjects, attendance: $attendance) {
          id
          name
        }
      }
    `;

    const variables = {
      id: parseInt(updateForm.id),
      name: updateForm.name,
      age: parseInt(updateForm.age),
      class: updateForm.class,
      subjects: typeof updateForm.subjects === "string"
        ? updateForm.subjects.split(",").map((s) => s.trim())
        : [],
      attendance: parseFloat(updateForm.attendance)
    };

    try {
      await request(endpoint, mutation, variables);
      alert("Update successful");

      setUpdateForm({
        id: "",
        name: "",
        age: "",
        class: "",
        subjects: "",
        attendance: ""
      });
    } catch (error) {
      console.error("Update error:", error.response?.errors || error.message);
      alert("Update failed");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Add Employee</h2>
        <form onSubmit={handleAddSubmit}>
          <input name="id" value={form.id} onChange={(e) => handleChange(e)} placeholder="ID" />
          <input name="name" value={form.name} onChange={(e) => handleChange(e)} placeholder="Name" />
          <input name="age" value={form.age} onChange={(e) => handleChange(e)} placeholder="Age" />
          <input name="class" value={form.class} onChange={(e) => handleChange(e)} placeholder="Class" />
          <input name="subjects" value={form.subjects} onChange={(e) => handleChange(e)} placeholder="Subjects" />
          <input name="attendance" value={form.attendance} onChange={(e) => handleChange(e)} placeholder="Attendance %" />
          <button type="submit">Add Employee</button>
        </form>
      </div>

      <div className="form-box">
        <h2>Update Employee</h2>
        <form onSubmit={handleUpdateSubmit}>
          <input name="id" value={updateForm.id} onChange={(e) => handleChange(e, true)} placeholder="ID to Update" />
          <input name="name" value={updateForm.name} onChange={(e) => handleChange(e, true)} placeholder="New Name" />
          <input name="age" value={updateForm.age} onChange={(e) => handleChange(e, true)} placeholder="New Age" />
          <input name="class" value={updateForm.class} onChange={(e) => handleChange(e, true)} placeholder="New Class" />
          <input name="subjects" value={updateForm.subjects} onChange={(e) => handleChange(e, true)} placeholder="New Subjects" />
          <input name="attendance" value={updateForm.attendance} onChange={(e) => handleChange(e, true)} placeholder="New Attendance %" />
          <button type="submit">Update Employee</button>
        </form>
      </div>
    </div>
  );
};

export default AddOrUpdateEmployee;
