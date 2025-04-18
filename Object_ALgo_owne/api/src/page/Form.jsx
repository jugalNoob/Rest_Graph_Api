import React, { useState } from "react";

const App = () => {
  let isActive = navigator.onLine;

  const [data, setData] = useState([]); // Start with an empty list

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    accountNumber: "", // Will be auto-generated
    accountType: "Savings",
  });

  // Function to generate a random 10-digit account number
  const generateAccountNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const addUser = (e) => {
    e.preventDefault();

    if (!newUser.name || !newUser.email || !newUser.phone) {
      alert("Please fill in all fields!");
      return;
    }

    const newEntry = {
      index: data.length,
      details: {
        ...newUser,
        accountNumber: generateAccountNumber(), // Assign random account number
        createdAt: new Date().toISOString(),
        ...(isActive && { status: "userOnline" }),
      },
    };

    console.log("New Entry:", newEntry);

    // Update state and store in localStorage
    setData((prevData) => {
      const updatedData = [...prevData, newEntry];
      localStorage.setItem("userData", JSON.stringify(updatedData));
      return updatedData;
    });


    // Clear input fields
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
