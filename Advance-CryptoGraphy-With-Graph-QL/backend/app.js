const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
// const {USER}=require("./user")
// const {TODO}=require("./todo")
const Register=require("./models/student")
require("./db/conn")
require('dotenv').config();
const port = process.env.PORT

async function startServer() {
  const app = express();

  const typeDefs = gql`
    type User {
     id:ID!
      name: String!
      gender:String!
      subject:String!
      classs:String!
      date:String!      
     roll_no:Int!
    }

    type Mutation {
  addUser(name: String!, gender: String!, subject: String!, classs: String!, roll_no: Int!): User
  updateUser(id: ID!, name: String, gender: String, subject: String, classs: String, date: String, roll_no: Int): User
  deleteUser(id: ID!): Boolean
}

    type Query {
      getAllUsers: [User]
      postAlluser:[Mutation]
      
     
    }
  `;

 

const resolvers = {
  Query: {
    getAllUsers: async () => {
      try {
        const users = await Register.find();
        return users;
      } catch (error) {
        throw new Error("Error fetching users from the database");
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const newUser = new Register({
          name: args.name,
          gender: args.gender,
          subject: args.subject,
          classs: args.classs,
          roll_no: args.roll_no,
        });
        const savedUser = await newUser.save();
        console.log(savedUser)
        return savedUser;
       
      } catch (error) {
        res.status(400).json({error:"error adding a new user"})
        console.log(error)
        throw new Error("Error adding a new user");
      }
    },
    updateUser: async (_, args) => {
      try {
        const updatedUser = await Register.findByIdAndUpdate(
          args.id,
          {
            name: args.name,
            gender: args.gender,
            subject: args.subject,
            classs: args.classs,
            roll_no: args.roll_no,
          },
          { new: true } // Return the updated document
        );
        if (!updatedUser) {
          throw new Error("User not found");
        }
        return updatedUser;
      } catch (error) {
        throw new Error("Error updating user");
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await Register.findByIdAndDelete(id);
        if (!deletedUser) {
          throw new Error("User not found");
        }
        return true; // Return true to indicate successful deletion
      } catch (error) {
        throw new Error("Error deleting user");
      }
    },
  },
};


  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app });

  app.use(bodyParser.json());
  app.use(cors());

  app.listen(port, () => {
    console.log("Server is running at http://localhost:8000/graphql" , port);
  });
}

startServer();


///Post User All
// mutation AddUser($name: String!, $gender: String!, $subject: String!, $classs: String!,$roll_no: Int!) {
//   addUser(name: $name, gender: $gender, subject: $subject, classs: $classs, roll_no: $roll_no) {
//     id
//     name
//     gender
//     subject
//     classs
//     date
//     roll_no
//   }
// }
//Delete // user
// mutation Mutation($deleteUserId: ID!) {
//   deleteUser(id: $deleteUserId)
// }
// {
//   "deleteUserId": "650fc0c659978f15e20187ec"
//   }
    //get Logic add your api upload your api
    // resolvers:{
    //     Query:{
    //         getTodos:()=>[{id:1 , title:"somthing big one" }]
    //     }
    // }


    // query GetAllTodos {

    //     getTodos {
    //      title
    //      completed
    //        user{
    //     name
    //     email
    //     phone
    //        }
    //      }
        
    //     }
        
        