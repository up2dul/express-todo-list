import dbPool from '../utils/db';
import type { ActivityBody } from '../utils/types';

export function getAllActivities() {
	const query = 'SELECT * FROM activities';
	return dbPool.execute(query);
}

export async function getDetailActivity(activityId: string) {
	const query = `SELECT * FROM activities WHERE id=${activityId}`;
	return await dbPool.execute(query);
}

export function createActivity(body: ActivityBody) {
	const now = new Date().toISOString();
	const query = `INSERT INTO activities (title, email, createdAt, updatedAt) VALUES ('${body.title}', '${body.email}', '${now}', '${now}')`;
	return dbPool.execute(query).then(data => data);
}

export async function updateActivity(
	activityId: string,
	body: Pick<ActivityBody, 'title'>,
) {
	const query = `UPDATE activities SET title='${body.title}' WHERE id=${activityId}`;
	return await dbPool.execute(query);
}

export async function deleteActivity(activityId: string) {
	const query = `DELETE FROM activities WHERE id=${activityId}`;
	return await dbPool.execute(query);
}
