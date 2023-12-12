import dbPool from '../utils/db';
import type { TodoBody } from '../utils/types';

export async function getAllTodos() {
  const query = 'SELECT * FROM todos';
  return await dbPool.execute(query);
}

export async function getDetailTodo(todoId: string) {
  const query = `SELECT * FROM todos WHERE id=${todoId}`;
  return await dbPool.execute(query);
}

export async function createTodo(body: TodoBody) {
  const query = `INSERT INTO todos (title, activity_group_id, is_active) VALUES ('${body.title}', ${body.activity_group_id}, ${body.is_active})`;
  return await dbPool.execute(query);
}

export async function updateTodo(
  todoId: string,
  body: Pick<TodoBody, 'title'>,
) {
  const query = `UPDATE todos SET title='${body.title}' WHERE id=${todoId}`;
  return await dbPool.execute(query);
}

export async function deleteTodo(todoId: string) {
  const query = `DELETE FROM todos WHERE id=${todoId}`;
  return await dbPool.execute(query);
}
