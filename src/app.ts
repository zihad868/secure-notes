import express, { Request, Response } from 'express';
import path from 'path';


const app = express();
const port = process.env.PORT || 5000


// Route handler for the root endpoint
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Welcome to the secure notes API",
  });
});




app.get("/api/v1/health", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Server is healthy, So far so good!"
    });
});

export default app;
