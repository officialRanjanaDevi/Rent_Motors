import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(cookieParser());

//routes
import authRouter from "./routes/auth.routes.js";
import renterRouter from "./routes/renter.routes.js";
import clientRouter from "./routes/client.routes.js";

//routes declaration
app.get('/', (req, res) => {
  res.send('Hi, World! This is a simple route.');
});
app.get('/api/', (req, res) => {
  res.send('Hello, World! This is a simple route.');
});
app.use("/api/auth", authRouter);
app.use("/api/renter", renterRouter);
app.use("/api/client", clientRouter);

export { app };
