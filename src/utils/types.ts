import type { RowDataPacket } from 'mysql2';

export interface ActivityBody {
	title: string;
	email: string;
}

export interface Activity extends ActivityBody, RowDataPacket {
	id: number;
	createdAt: string;
	updatedAt: string;
}

export interface TodoBody {
	title: string;
	activity_group_id: number;
	is_active: boolean;
}

export interface TodoUpdateBody {
	title: string;
	priority: string;
	is_active: boolean;
	status: string;
}

export interface Todo extends TodoBody, RowDataPacket {
	id: number;
	priority: string;
	createdAt: string;
	updatedAt: string;
}

export enum StatusCode {
	OK = 200,
	CREATED = 201,
	NOT_FOUND = 404,
	BAD_REQUEST = 400,
	SERVER_ERROR = 500,
}
