import { Schema, model } from 'mongoose';

interface IStudent {
  email: string;
  pseudo: string;
  role: 'student' | 'professor';
}

const StudentSchema = new Schema<IStudent>({
  email: { type: String, required: true, unique: true },
  pseudo: { type: String, required: true },
  role: { type: String, required: true, enum: ['student', 'professor'] },
});

export const StudentModel = model<IStudent>('Student', StudentSchema);
