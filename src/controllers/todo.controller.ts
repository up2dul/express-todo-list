import type { Request, Response } from 'express';
import * as TodoModel from '../models/todo.model';
import type { TodoBody, TodoUpdateBody } from '../utils/types';

export async function getAllTodos(req: Request, res: Response) {
	const { activityId } = req.params;

	try {
		const data = await TodoModel.getAllTodos(activityId);

		res.json({
			status: 'Success',
			message: 'Success',
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
		const data = await TodoModel.getDetailTodo(todoId);

		if (data.length === 0) {
			return res.status(404).json({
				status: 'Not Found',
				message: `Todo with ID ${todoId} Not Found`,
			});
		}

		res.json({
			status: 'Success',
			message: 'Success',
			data: data[0],
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

	for (const key in body) {
		if (body[key as keyof TodoBody] === undefined) {
			return res.status(400).json({
				status: 'Bad Request',
				message: `${key} is required`,
			});
		}
	}

	try {
		const data = await TodoModel.createTodo(body);

		res.status(201).json({
			status: 'Success',
			message: 'Success',
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
	const body: TodoUpdateBody = req.body;

	for (const key in body) {
		if (body[key as keyof TodoUpdateBody] === undefined) {
			return res.status(400).json({
				status: 'Bad Request',
				message: `${key} is required`,
			});
		}
	}

	try {
		const data = await TodoModel.updateTodo(todoId, body);

		if (data?.affectedRows === 0) {
			return res.status(404).json({
				status: 'Not Found',
				message: `Todo with ID ${todoId} Not Found`,
			});
		}

		res.json({
			status: 'Success',
			message: 'Success',
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
		const data = await TodoModel.deleteTodo(todoId);

		if (data?.affectedRows === 0) {
			return res.status(404).json({
				status: 'Not Found',
				message: `Todo with ID ${todoId} Not Found`,
			});
		}

		res.json({
			status: 'Success',
			message: 'Success',
			data: {},
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
