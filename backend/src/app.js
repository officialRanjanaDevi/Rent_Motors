import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cookieParser());

app.use(cors({
  origin: ['https://rent-motors-frontend.vercel.app'], // Frontend URL
  credentials: true, 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


//routes
import authRouter from "./routes/auth.routes.js";
import renterRouter from "./routes/renter.routes.js";
import clientRouter from "./routes/client.routes.js";

//routes declaration
app.get('/', (req, res) => {
  res.send('Hi, World! Welcome to Rent Motors');
 
});
app.use("/api/auth", authRouter);
app.use("/api/renter", renterRouter);
app.use("/api/client", clientRouter);

export { app };
