export interface ActivityBody {
	title: string;
	email: string;
}

export interface ActivityResponse {
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

export interface TodoResponse {
	id: number;
	activity_group_id: number;
	title: string;
	is_active: boolean;
	priority: string;
	createdAt: string;
	updatedAt: string;
}
