import type { Request, Response } from 'express';
import * as TodoModel from '../models/todo';
import type { TodoBody } from '../utils/types';

export async function getAllTodos(_: Request, res: Response) {
	try {
		const [data] = await TodoModel.getAllTodos();
		res.json({
			status: 'success retrieved all todos',
			data,
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({
				status: 'error',
				message: error.message,
			});
		}
	}
}

export async function getDetailTodo(req: Request, res: Response) {
	const { todoId } = req.params;
	try {
		const [data] = await TodoModel.getDetailTodo(todoId);
		res.json({
			status: 'success retrieved todo',
			data,
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({
				status: 'error',
				message: error.message,
			});
		}
	}
}

export async function createTodo(req: Request, res: Response) {
	const body: TodoBody = req.body;
	try {
		const [data] = await TodoModel.createTodo(body);
		res.json({
			status: 'success created todo',
			data,
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({
				status: 'error',
				message: error.message,
			});
		}
	}
}

export async function updateTodo(req: Request, res: Response) {
	const { todoId } = req.params;
	const body: Pick<TodoBody, 'title'> = req.body;
	try {
		const [data] = await TodoModel.updateTodo(todoId, body);
		res.json({
			status: 'success updated todo',
			data,
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({
				status: 'error',
				message: error.message,
			});
		}
	}
}

export async function deleteTodo(req: Request, res: Response) {
	const { todoId } = req.params;
	try {
		const [data] = await TodoModel.deleteTodo(todoId);
		res.json({
			status: 'success deleted todo',
			data,
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({
				status: 'error',
				message: error.message,
			});
		}
	}
}
