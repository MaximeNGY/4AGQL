import { Schema, model } from 'mongoose';

interface IClass {
  name: string;
  description: string;
  professor: string;
  students: string[]; // Liste des IDs des étudiants
}

const ClassSchema = new Schema<IClass>({
  name: { type: String, required: true },
  description: { type: String },
  professor: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
});

export const ClassModel = model<IClass>('Class', ClassSchema);
