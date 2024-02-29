import { ResultSetHeader } from 'mysql2';
import dbPool from '../utils/db';
import type { Todo, TodoBody, TodoUpdateBody } from '../utils/types';

export async function getAllTodos(activityId: string) {
	const query = 'SELECT * FROM todos WHERE activity_group_id=?';

	return new Promise((resolve, reject) => {
		dbPool.query<Todo[]>(query, [activityId], (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}

export async function getDetailTodo(todoId: string): Promise<Todo[]> {
	const query = 'SELECT * FROM todos WHERE id=?';

	return new Promise((resolve, reject) => {
		dbPool.query<Todo[]>(query, [todoId], (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}

export async function createTodo({
	title,
	activity_group_id,
	is_active,
}: TodoBody) {
	const now = new Date().toISOString();
	const query =
		'INSERT INTO todos (title, activity_group_id, is_active, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)';

	return new Promise((resolve, reject) => {
		dbPool.query<ResultSetHeader>(
			query,
			[title, activity_group_id, is_active],
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve({
						id: result.insertId,
						title,
						activity_group_id,
						is_active,
						createdAt: now,
						updatedAt: now,
					});
				}
			},
		);
	});
}

export async function updateTodo(
	todoId: string,
	{ title, priority, is_active, status }: TodoUpdateBody,
): Promise<Todo | ResultSetHeader> {
	const now = new Date().toISOString();
	const query =
		'UPDATE todos SET title=?, priority=?, is_active=?, status=?, updatedAt=? WHERE id=?';

	return new Promise((resolve, reject) => {
		dbPool.query<ResultSetHeader>(
			query,
			[title, priority, is_active, status, now, todoId],
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					if (result.affectedRows === 0) {
						resolve(result);
					}

					getDetailTodo(todoId).then(todo => {
						resolve({
							...todo[0],
							title,
							priority,
							is_active,
							status,
							updatedAt: now,
						});
					});
				}
			},
		);
	});
}

export async function deleteTodo(todoId: string): Promise<ResultSetHeader> {
	const query = 'DELETE FROM todos WHERE id=?';

	return new Promise((resolve, reject) => {
		dbPool.query<ResultSetHeader>(query, [todoId], (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}
