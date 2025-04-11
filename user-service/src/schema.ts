import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    pseudo: String!
    role: String!
  }
    
  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    users: [User!]!
  }

  type Mutation {
    register(email: String!, pseudo: String!, password: String!, role: String): AuthPayload
    login(email: String!, password: String!): AuthPayload
    updateUser(pseudo: String): User
    deleteUser: Boolean
  }
`;

export default typeDefs;