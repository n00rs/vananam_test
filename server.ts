// Import the 'express' module along with 'Request' and 'Response' types from express
import express, { Application, NextFunction, Request, Response, } from "express";
// Create an Express application
const app:Application = express();
app.use(express.json());
// Specify the port number for the server
const port = process.env.PORT;

app.use('/api/wallet',require('./routes/index.router'))

// for handling Error
app.use((err, req: Request, res: Response, next: NextFunction) => {
  console.error(err, "-------------");
  const statusCode = err.statusCode ? err.statusCode : 400;
  res.status(statusCode).json({ errMessage: err.message });
});

// Start the server and listen on the specified port
app.listen(port, () =>
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`)
);
