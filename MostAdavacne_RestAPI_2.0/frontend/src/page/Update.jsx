import axios from "axios";
import React, { useState } from "react";

const Update = () => {
  const [id, setId] = useState(""); // Student ID
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const data = { name, age, country };
      const response = await axios.patch(`http://localhost:9000/updates/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Student updated successfully!");
      } else {
        alert("Failed to update student data.");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      alert("An error occurred while updating student data.");
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Update Student</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Student ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            placeholder="Enter student ID"
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter student age"
          />
        </label>
        <br />
        <label>
          Country:
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter student country"
          />
        </label>
        <br />
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default Update;
