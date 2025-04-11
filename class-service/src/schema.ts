import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # Types pour les classes
  type Class {
    id: ID!
    name: String!
    description: String
    professor: String!
    students: [Student!]!
  }

  # Type pour l'étudiant
  type Student {
    id: ID!
    email: String!
    pseudo: String!
    role: String!
  }

  # Query pour récupérer les classes et une classe spécifique
  type Query {
    getClasses: [Class!]
    getClass(id: ID!): Class
  }

  # Mutations pour créer, mettre à jour et supprimer des classes
  type Mutation {
    createClass(name: String!, description: String, professor: String!): Class!
    updateClass(id: ID!, name: String!, description: String, professor: String!): Class!
    deleteClass(id: ID!): Boolean!
    addStudentToClass(classId: ID!, studentId: ID!): Class!
  }
`;

export default typeDefs;