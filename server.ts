
import express, { Request, Response } from 'express';

const app = express();
const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Secure notes server is running...');
});

app.listen(port, () => {
  console.log(`secure notes server is runlistening on port ${port}`);
});
