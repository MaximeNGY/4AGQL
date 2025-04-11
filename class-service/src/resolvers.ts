import { ClassModel } from './models/Class';
import axios from 'axios';

export const resolvers = {
  Query: {
    // Récupérer toutes les classes
    getClasses: async () => {
      return await ClassModel.find();
    },

    // Récupérer une classe par ID
    getClass: async (_: any, { id }: { id: string }) => {
      return await ClassModel.findById(id);
    },
  },

  Mutation: {
    // Créer une nouvelle classe
    createClass: async (
      _: any,
      { name, description, professor }: { name: string; description: string; professor: string }
    ) => {
      const newClass = new ClassModel({
        name,
        description,
        professor,
        students: [],
      });
      return await newClass.save();
    },

    // Mettre à jour une classe existante
    updateClass: async (
      _: any,
      { id, name, description, professor }: { id: string; name: string; description: string; professor: string }
    ) => {
      return await ClassModel.findByIdAndUpdate(
        id,
        { name, description, professor },
        { new: true }
      );
    },

    // Supprimer une classe
    deleteClass: async (_: any, { id }: { id: string }) => {
      const classToDelete = await ClassModel.findById(id);
      if (!classToDelete) {
        throw new Error('Class not found');
      }

      // On ne peut pas supprimer une classe si des étudiants sont affectés
      if (classToDelete.students.length > 0) {
        throw new Error('Cannot delete class with students assigned');
      }

      await classToDelete.deleteOne();
      return true;
    },

    // Ajouter un étudiant à une classe
    addStudentToClass: async (_: any, { classId, studentId }: { classId: string; studentId: string }) => {
      const classToUpdate = await ClassModel.findById(classId);
      if (!classToUpdate) throw new Error("Class not found");
    
      // Vérifie via user-service
      const response = await axios.get(`http://user-service:4001/users/${studentId}`).catch(() => null);
      const student = response?.data;
    
      if (!student || student.role !== "student") throw new Error("Student not found");
    
      if (!classToUpdate.students.includes(studentId)) {
        classToUpdate.students.push(studentId);
        await classToUpdate.save();
      }
    
      return classToUpdate;
    },
  },
};

export default resolvers;