import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  classId: { type: String, required: true },
  score: { type: Number, required: true },
  comment: { type: String },
});

export const Grade = mongoose.model('Grade', gradeSchema);
