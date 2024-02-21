import type { Request, Response } from 'express';
import * as ActivityModel from '../models/activity.model';
import type { ActivityBody } from '../utils/types';

export async function getAllActivities(_: Request, res: Response) {
	try {
		const data = await ActivityModel.getAllActivities();
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

export async function getDetailActivity(req: Request, res: Response) {
	const { activityId } = req.params;

	try {
		const data = await ActivityModel.getDetailActivity(activityId);

		if (data.length === 0) {
			return res.status(404).json({
				status: 'Not Found',
				message: `Activity with ID ${activityId} Not Found`,
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

export async function createActivity(req: Request, res: Response) {
	const body: ActivityBody = req.body;

	try {
		const data = await ActivityModel.createActivity(body);

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

export async function updateActivity(req: Request, res: Response) {
	const { activityId } = req.params;
	const body: Pick<ActivityBody, 'title'> = req.body;

	try {
		const data = await ActivityModel.updateActivity(activityId, body);

		if (data?.affectedRows === 0) {
			return res.status(404).json({
				status: 'Not Found',
				message: `Activity with ID ${activityId} Not Found`,
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

export async function deleteActivity(req: Request, res: Response) {
	const { activityId } = req.params;

	try {
		const data = await ActivityModel.deleteActivity(activityId);

		if (data.affectedRows === 0) {
			return res.status(404).json({
				status: 'Not Found',
				message: `Activity with ID ${activityId} Not Found`,
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
