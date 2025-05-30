"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3003;
app.use(express.json());
app.get("/", (req, res) => res.send("Express on vercel"));
app.listen(PORT, () => {
    console.log(`Application is running at http://localhost:${PORT}`);
});
exports.default = app;
