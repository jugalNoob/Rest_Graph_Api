import React, { useState, useEffect } from "react";

// Function to get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem("userData")) || [];
}

// Function to save users to localStorage
function saveUsers(users) {
    localStorage.setItem("userData", JSON.stringify(users));
}

// Function to update a user's name based on index or account number
function updateUser(indexNumber, accountNumber, newName) {
    let users = getUsers();
    let userFound = false;

    for (let i = 0; i < users.length; i++) {
        if (
            users[i].index === indexNumber ||
            users[i].details.accountNumber === accountNumber
        ) {
            console.log(`Before Update: ${users[i].details.name}`);
            users[i].details.name = newName;
            console.log(`After Update: ${users[i].details.name}`);
            userFound = true;
            break;
        }
    }

    if (userFound) {
        saveUsers(users);
        return true;
    } else {
        console.log("User not found!");
        return false;
    }
}

const UserUpdate = () => {
    const [index, setIndex] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [newName, setNewName] = useState("");
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setUsers(getUsers());
    }, []);

    const handleUpdate = () => {
        if (!index && !accountNumber) {
            setMessage("Please provide index or account number.");
            return;
        }

        const success = updateUser(Number(index), accountNumber, newName);
        if (success) {
            setMessage("User updated successfully!");
            setUsers(getUsers());
        } else {
            setMessage("User not found!");
        }

        setIndex("");
        setAccountNumber("");
        setNewName("");
    };

    return (
        <div>
            <h2>User Update</h2>
            <input
                type="number"
                placeholder="Enter Index"
                value={index}
                onChange={(e) => setIndex(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter New Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
            <br />
            <br />

            <button onClick={handleUpdate}>Update User</button>

            <br />
            <br />
            {message && <p>{message}</p>}
            <br />

            <h3>Users List</h3>
            
            <ul>
                {users.map((user) => (
                    <li key={user.index}>{user.details.name} - {user.details.accountNumber}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserUpdate;