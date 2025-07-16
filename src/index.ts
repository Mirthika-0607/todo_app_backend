import express from 'express';
import mongoose from 'mongoose';
import { configureRoutes } from './routes/todo_routes';
import { config } from './config';

const app = express();
app.use(express.json());

mongoose.connect(config.MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

configureRoutes(app); // ⬅️ Set up all routes

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
