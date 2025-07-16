import { randomUUID } from 'crypto';
import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
  },
  done: {
    type: Boolean,
  }
});

export const Todo = mongoose.model('Todo', TodoSchema);