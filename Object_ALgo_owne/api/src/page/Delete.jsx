import React, { useState, useEffect } from "react";

// Function to get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem("userData")) || [];
}

// Function to save users to localStorage
function saveUsers(users) {
    localStorage.setItem("userData", JSON.stringify(users));
}

// Function to delete a user based on index, name, or account number
function deleteUser(indexNumber, username, accountNumber) {
    let users = getUsers();
    let indexToDelete = -1;

    for (let i = 0; i < users.length; i++) {
        if (
            users[i].index === indexNumber ||  // Check index
            users[i].details.name.toLowerCase() === username.toLowerCase() ||  // Check name
            users[i].details.accountNumber === accountNumber  // Check account number
        ) {
            indexToDelete = i;
            break;
        }
    }

    if (indexToDelete !== -1) {
        console.log("Deleting user:", users[indexToDelete]);
        users.splice(indexToDelete, 1);
        saveUsers(users);
        return true; // Indicate successful deletion
    } else {
        console.log(`User not found for Index: ${indexNumber}, Name: "${username}", or Account Number: "${accountNumber}"`);
        return false; // Indicate failure
    }
}

const UserDeletion = () => {
    const [index, setIndex] = useState("");
    const [name, setName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setUsers(getUsers());
    }, []);

    const handleDelete = () => {
        if (!index && !name && !accountNumber) {
            setMessage("Please provide at least one search criterion.");
            return;
        }

        const success = deleteUser(Number(index), name, accountNumber);
        if (success) {
            setMessage("User deleted successfully!");
            setUsers(getUsers());
        } else {
            setMessage("User not found!");
        }

        setIndex("");
        setName("");
        setAccountNumber("");
    };

    return (
        <div>
            <h2>User Deletion</h2>
            <input
                type="number"
                placeholder="Enter Index"
                value={index}
                onChange={(e) => setIndex(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
            />
            <button onClick={handleDelete}>Delete User</button>
            {message && <p>{message}</p>}
            <h3>Users List</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.index}>{user.details.name} - {user.details.accountNumber}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserDeletion;