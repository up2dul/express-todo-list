import 'dotenv/config';
import mysql from 'mysql2';

const dbPool = mysql
	.createPool({
		host: process.env.DB_HOST || 'localhost',
		port: Number(process.env.DB_PORT) || 3306,
		user: process.env.DB_USERNAME || 'root',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME,
	})
	.promise();

export default dbPool;
