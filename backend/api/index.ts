import { OAuth2Client } from "google-auth-library";
import { Request, Response } from "express";

const express = require("express");
const app = express();

const PORT: string | number = process.env.PORT || 3003;
app.use(express.json());

const googleAuthClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,

);


app.get("/", (req: Request, res: Response) => res.send("Express on vercel"));

app.listen(PORT, () => {
    console.log(`Application is running at http://localhost:${PORT}`);
});

export default app;



