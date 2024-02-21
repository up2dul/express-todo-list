import cors from 'cors';
import express from 'express';
import type { Application, NextFunction, Response } from 'express';

import activityRoutes from './routes/activity.route';
import todoRoutes from './routes/todo';

const app: Application = express();
const port = 3030;

app.use(express.json());
app.use(cors());
app.use((_, res: Response, next: NextFunction) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
});

app.use('/activity-groups', activityRoutes);
// app.use('/todo-items', todoRoutes);

app.listen(port, () => console.log(`Listening on port: ${port}`));
