import React, { useEffect, useState } from 'react';
import { gql, useQuery } from "@apollo/client";
import "./style/get.css"
// Define the GraphQL query outside the component
const GET_ALL_USERS = gql`
  query Query {
    getAllUsers {
      id
      name
      classs
      roll_no
      subject
      date
      gender
    }
  }
`;


function Gets() {
    const { data, loading } = useQuery(GET_ALL_USERS);
    const [searchQuery, setSearchQuery] = useState("");
  
    useEffect(() => {
      // You can add some logic here if needed
    }, []);
  
    if (loading) return <h1>Loading...</h1>;
  
    // Check if data.getAllUsers is defined before filtering
    const users = data?.getAllUsers || [];
  
    const filteredUsers = users.filter(user => {
      try {
        return (
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.classs.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.gender.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } catch (error) {
        console.error(error);
        alert("check your name")
        return false;
      }
    });
  
    return (
      <div className="App">

<div className="background-get">


<div className="form">
<center>

        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        </center>
  </div>
        <div className="allone">
          <center>
     
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Roll No</th>
                <th>Subject</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.classs}</td>
                  <td>{user.roll_no}</td>
                  <td>{user.subject}</td>
                  <td>{user.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
                 
          </center>
        </div>
        </div>
      </div>
    );
  }
  export default Gets