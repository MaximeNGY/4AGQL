import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Grade {
    id: ID!
    studentId: String!
    classId: String!
    score: Float!
    comment: String
  }

  type Query {
    getGrades: [Grade!]!
    getGradesByStudent(studentId: String!): [Grade!]!
    getGradesByClass(classId: String!): [Grade!]!
  }

  type Mutation {
    createGrade(studentId: String!, classId: String!, score: Float!, comment: String): Grade!
    updateGrade(id: ID!, score: Float!, comment: String): Grade!
    deleteGrade(id: ID!): Boolean!
  }
`;

export default typeDefs;