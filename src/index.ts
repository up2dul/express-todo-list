import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();
const port = 3030;

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  const data = {
    status: 'OK',
    message: 'Hello express!',
  };
  res.status(200).send(data);
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
