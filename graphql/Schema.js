const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
    type User {
        id: ID
        username: String!
        password: String!
        email: String!
    }

    type Employee {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        salary: Float!
    }

    type Query {
        login(username: String!, password: String!): LoginResponse!
        getEmployees: [Employee]
        getEmployeeByID(id: ID!): Employee!
        getEmployeesByFirstName(firstName: String!): [Employee]
        getEmployeesByLastName(lastName: String!): [Employee]
    }

    type LoginResponse {
        status: Boolean!
        message: String!
        username: String!
    }

    type RegisterResponse {
        status: Boolean!
        message: String!

    }

    input EmployeeInput  {
        first_name: String!
        last_name: String!
        gender: String!
        email: String!
        salary: Float!
    }

    input EmployeeUpdate  {
        id: ID!
        first_name: String!
        last_name: String!
        gender: String!
        email: String!
        salary: Float!
    }

    type DeleteResponse {
        status: Boolean!
        message: String!
    }

    type Mutation {
        signup(username: String!
            password: String!
            email: String!): RegisterResponse!
        addEmployee(input: EmployeeInput): Employee!
        updateEmployee(input: EmployeeInput): Employee!
        deleteEmployee(id: String!): DeleteResponse!
    }
`