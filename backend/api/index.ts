
import { Request, Response } from "express";

const express = require("express");
const app = express();

const PORT: string | number = process.env.PORT || 3003;
app.use(express.json());


app.get("/", (req: Request, res: Response) => res.send("Express on vercel"));

app.listen(PORT, () => {
    console.log(`Application is running at http://localhost:${PORT}`);
});

export default app;



