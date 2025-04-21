import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  taskName: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default model('Task', taskSchema);
