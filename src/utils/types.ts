import type { RowDataPacket } from 'mysql2';

export interface ActivityBody {
	title: string;
	email: string;
}

export interface Activity extends RowDataPacket {
	id: number;
	title: string;
	email: string;
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

export interface Todo extends RowDataPacket {
	id: number;
	activity_group_id: number;
	title: string;
	is_active: boolean;
	priority: string;
	createdAt: string;
	updatedAt: string;
}
