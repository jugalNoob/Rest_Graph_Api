import React, { useState } from "react";

const App = () => {
  let isActive = navigator.onLine ? true : false;

  const [data, setData] = useState([
    {
      index: 0,
      details: {
        name: "Jugal Sharma",
        ...(isActive && { status: "userOnline" }),
        total: 45,
        accountNumber: "1234567890",
        email: "jugal@example.com",
        phone: "9876543210",
        address: "123 Main St, City, Country",
        accountType: "Savings",
        createdAt: new Date().toISOString(),
      },
    },
    {
      index: 1,
      details: {
        name: "Kanika Sharma",
        total: 44,
        accountNumber: "0987654321",
        email: "kanika@example.com",
        phone: "8765432109",
        address: "456 Elm St, City, Country",
        accountType: "Checking",
        createdAt: new Date().toISOString(),
      },
    },
  ]);

  // Handle input change for any user field
  const handleChange = (index, field, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.index === index
          ? { ...item, details: { ...item.details, [field]: value } }
          : item
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Information</h2>

      {data.map((user) => (
        <div key={user.index} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
          <h3>User {user.index + 1}</h3>
          <label>Name: </label>
          <input
            type="text"
            value={user.details.name}
            onChange={(e) => handleChange(user.index, "name", e.target.value)}
          />
          <br />
          
          <label>Email: </label>
          <input
            type="email"
            value={user.details.email}
            onChange={(e) => handleChange(user.index, "email", e.target.value)}
          />
          <br />

          <label>Phone: </label>
          <input
            type="tel"
            value={user.details.phone}
            onChange={(e) => handleChange(user.index, "phone", e.target.value)}
          />
          <br />

          <label>Account Type: </label>
          <select
            value={user.details.accountType}
            onChange={(e) => handleChange(user.index, "accountType", e.target.value)}
          >
            <option value="Savings">Savings</option>
            <option value="Checking">Checking</option>
          </select>
          <br />

          <pre>{JSON.stringify(user.details, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default App;


:::::::::::::::::::::::::::::: ----------------------------------------->>

import React, { useState } from "react";

const App = () => {
  let isActive = navigator.onLine;

  const [data, setData] = useState([]); // Start with an empty list

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    accountNumber: "",
    accountType: "Savings",
  });

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const addUser = (e) => {
    e.preventDefault();

    if (!newUser.name || !newUser.email || !newUser.phone || !newUser.accountNumber) {
      alert("Please fill in all fields!");
      return;
    }

    const newEntry = {
      index: data.length,
      details: {
        ...newUser,
        createdAt: new Date().toISOString(),
        ...(isActive && { status: "userOnline" }),
      },
    };

    console.log(newEntry); // Log the new user object

    setData((prevData) => [...prevData, newEntry]);

    // Clear input fields after adding the user
    setNewUser({
      name: "",
      email: "",
      phone: "",
      address: "",
      accountNumber: "",
      accountType: "Savings",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New User</h2>
      <form onSubmit={addUser} style={{ border: "1px solid #000", padding: "10px", borderRadius: "8px", width: "300px" }}>
        <label>Name: </label>
        <input type="text" name="name" value={newUser.name} onChange={handleNewUserChange} />
        <br />

        <label>Email: </label>
        <input type="email" name="email" value={newUser.email} onChange={handleNewUserChange} />
        <br />

        <label>Phone: </label>
        <input type="tel" name="phone" value={newUser.phone} onChange={handleNewUserChange} />
        <br />

        <label>Address: </label>
        <input type="text" name="address" value={newUser.address} onChange={handleNewUserChange} />
        <br />

        <label>Account Number: </label>
        <input type="text" name="accountNumber" value={newUser.accountNumber} onChange={handleNewUserChange} />
        <br />

        <label>Account Type: </label>
        <select name="accountType" value={newUser.accountType} onChange={handleNewUserChange}>
          <option value="Savings">Savings</option>
          <option value="Checking">Checking</option>
        </select>
        <br />

        <button type="submit">Add User</button>
      </form>

      {/* Display added users */}
      <h2>Users List</h2>
      {data.map((user) => (
        <div key={user.index} style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
          <h3>User {user.index + 1}</h3>
          <pre>{JSON.stringify(user.details, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default App;

