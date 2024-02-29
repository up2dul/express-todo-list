import { ResultSetHeader } from 'mysql2';
import dbPool from '../utils/db';
import type { ActivityBody, Activity } from '../utils/types';

export function getAllActivities() {
	const query = 'SELECT * FROM activities';

	return new Promise((resolve, reject) => {
		dbPool.query<Activity[]>(query, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}

export function getDetailActivity(activityId: string): Promise<Activity[]> {
	const query = 'SELECT * FROM activities WHERE id=?';

	return new Promise((resolve, reject) => {
		dbPool.query<Activity[]>(query, [activityId], (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}

export function createActivity({ title, email }: ActivityBody) {
	const now = new Date().toISOString();
	const query =
		'INSERT INTO activities (title, email, createdAt, updatedAt) VALUES (?, ?, ?, ?)';

	return new Promise((resolve, reject) => {
		dbPool.query<ResultSetHeader>(
			query,
			[title, email, now, now],
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve({
						id: result.insertId,
						title,
						email,
						createdAt: now,
						updatedAt: now,
					});
				}
			},
		);
	});
}

export function updateActivity(
	activityId: string,
	{ title }: Pick<ActivityBody, 'title'>,
): Promise<Activity | ResultSetHeader> {
	const now = new Date().toISOString();
	const query = 'UPDATE activities SET title=?, updatedAt=? WHERE id=?';

	return new Promise((resolve, reject) => {
		dbPool.query<ResultSetHeader>(
			query,
			[title, now, activityId],
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					if (result.affectedRows === 0) {
						resolve(result);
					}

					getDetailActivity(activityId).then(activity => {
						resolve({
							...activity[0],
							title,
							updatedAt: now,
						});
					});
				}
			},
		);
	});
}

export async function deleteActivity(
	activityId: string,
): Promise<ResultSetHeader> {
	const query = 'DELETE FROM activities WHERE id=?';

	return new Promise((resolve, reject) => {
		dbPool.query<ResultSetHeader>(query, [activityId], (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}
