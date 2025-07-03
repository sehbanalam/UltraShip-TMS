const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    token: String
  }

  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String
    subjects: [String]
    attendance: Float
  }

  type Query {
    me: User
    employees(page: Int, limit: Int, sortBy: String): [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!, role: String!): User
    loginUser(email: String!, password: String!): User

    addEmployee(name: String!, age: Int!, class: String, subjects: [String], attendance: Float): Employee
    updateEmployee(id: ID!, name: String, age: Int, class: String, subjects: [String], attendance: Float): Employee
    deleteEmployee(id: ID!): Boolean

  }
`;

module.exports = typeDefs;
