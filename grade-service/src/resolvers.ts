import { Grade } from './models/Grade';

export const resolvers = {
  Query: {
    getGrades: async () => {
      return await Grade.find();
    },
    getGradesByStudent: async (_: any, { studentId }: { studentId: string }) => {
      return await Grade.find({ studentId });
    },
    getGradesByClass: async (_: any, { classId }: { classId: string }) => {
      return await Grade.find({ classId });
    },
  },
  Mutation: {
    createGrade: async (_: any, { studentId, classId, score, comment }: any) => {
      const grade = new Grade({ studentId, classId, score, comment });
      await grade.save();
      return grade;
    },
    updateGrade: async (_: any, { id, score, comment }: any) => {
      const updated = await Grade.findByIdAndUpdate(id, { score, comment }, { new: true });
      return updated;
    },
    deleteGrade: async (_: any, { id }: any) => {
      const deleted = await Grade.findByIdAndDelete(id);
      return !!deleted;
    },
  },
};

export default resolvers;