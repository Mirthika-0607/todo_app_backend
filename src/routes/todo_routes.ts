import { Application, Request, Response } from 'express';
import { Todo } from '../models/todo_model';

export function configureRoutes(app: Application) {

  // CREATE
  app.post('/todos/create', async (req: Request, res: Response) => {
    try {
    const { task, completed } = req.body;

    const newTodo = new Todo({
      task: task,              
      completed: completed,  
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create TODO' });
  }
});

  // READ
  app.post('/todos/list', async (_req: Request, res: Response) => {
    try {
      const todos = await Todo.find().lean();
      console.log('POST /todos/list: Fetched', todos.length, 'todos');
      res.status(200).json(todos);
    } catch (error: any) {
      console.error('POST /todos/list: Error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

  // UPDATE
  app.post('/todos/update', async (req: Request, res: Response) => {
   try {
    const { id, task, completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        task: task,              
        completed: completed,   
      },
      { new: true } // returns updated Document
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'TODO not found' });
    }

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update TODO' });
  }
});

  // DELETE
  app.post('/todos/delete', async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    try {
      const deletedTodo = await Todo.findByIdAndDelete(id);
      if (!deletedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      console.log('POST /todos/delete: Deleted todo', id);
      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error: any) {
      console.error('POST /todos/delete: Error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
}
