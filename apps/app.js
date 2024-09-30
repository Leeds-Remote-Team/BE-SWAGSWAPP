const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.get("/api/wardrobe", getWardrobe);
// app.post("/api/wardrobe/:id/clothes", postComment);
