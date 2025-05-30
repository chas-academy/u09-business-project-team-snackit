import { Request, Response } from "express";
import userRouter from "../routes/userRoutes";
import connectDB from "../database/db";
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const express = require("express");
const app = express();

const PORT: string | number = process.env.PORT || 3003;
app.use(express.json());

app.get("/", (req: Request, res: Response) => res.send("Express on vercel"));

app.use('/users', userRouter)

app.listen(PORT, () => {
    console.log(`Application is running at http://localhost:${PORT}`);
});

export default app;