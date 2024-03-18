import type { Request, Response } from 'express';
import * as ActivityModel from '../models/activity.model';
import { StatusCode, type ActivityBody } from '../utils/types';

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
			res.status(StatusCode.SERVER_ERROR).json({
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
			return res.status(StatusCode.NOT_FOUND).json({
				status: 'Not Found',
				message: `Activity with ID ${activityId} Not Found`,
			});
		}

		res.json({
			status: 'Success',
			message: 'Success',
			data: data[0],
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(StatusCode.SERVER_ERROR).json({
				status: 'error',
				message: error.message,
			});
		}
	}
}

export async function createActivity(req: Request, res: Response) {
	const body: ActivityBody = req.body;

	for (const key in body) {
		const value = body[key as keyof ActivityBody];
		if (value === undefined) {
			return res.status(StatusCode.BAD_REQUEST).json({
				status: 'Bad Request',
				message: `${value} is required`,
			});
		}
	}

	try {
		const data = await ActivityModel.createActivity(body);

		res.status(StatusCode.CREATED).json({
			status: 'Success',
			message: 'Success',
			data,
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(StatusCode.SERVER_ERROR).json({
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
			return res.status(StatusCode.NOT_FOUND).json({
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
			res.status(StatusCode.SERVER_ERROR).json({
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
			return res.status(StatusCode.NOT_FOUND).json({
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
			res.status(StatusCode.SERVER_ERROR).json({
				status: 'error',
				message: error.message,
			});
		}
	}
}
