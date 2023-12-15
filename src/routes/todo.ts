import express from 'express';
import * as TodoController from '../controllers/todo';

const router = express.Router();

// Get all todos
router.get('/', TodoController.getAllTodos);

// Get detail todo
router.get('/:todoId', TodoController.getDetailTodo);

// Create todo
router.post('/', TodoController.createTodo);

// Update todo
router.put('/:todoId', TodoController.updateTodo);

// Delete todo
router.delete('/:todoId', TodoController.deleteTodo);

export default router;
