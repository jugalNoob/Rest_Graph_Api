import React, { useEffect, useState } from "react";

function Get() {
  const [storedUsers, setStoredUsers] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("userData")) || [];
    setStoredUsers(Array.isArray(users) ? users : [users]); // Ensure it's always an array
    console.log("Stored Users:", users);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Retrieved Users</h1>

      {storedUsers.length > 0 ? (
        storedUsers.map((user, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
              background: "#f9f9f9",
            }}
          >
            <h3>User {index + 1}</h3>
            <p><strong>Name:</strong> {user.details.name}</p>
            <p><strong>Email:</strong> {user.details.email}</p>
            <p><strong>Phone:</strong> {user.details.phone}</p>
            <p><strong>Account Number:</strong> {user.details.accountNumber}</p>
            <p><strong>Account Type:</strong> {user.details.accountType}</p>
            <p><strong>Created At:</strong> {new Date(user.details.createdAt).toLocaleString()}</p>
            {user.details.status && <p><strong>Status:</strong> {user.details.status}</p>}
          </div>
        ))
      ) : (
        <p>No users found in local storage.</p>
      )}
    </div>
  );
}

export default Get;
