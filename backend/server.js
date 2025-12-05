import https from "https";
import fs from "fs";
import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {
    try {
    
        const team = req.body.team;
        const query = req.body.query;

        const result = await client.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                //{ role: "system", content: "You are a Pokémon expert. Answer detailed but brief." },
                { role: "user", content: "My team: " + JSON.stringify(team)},
                { role: "user", content: "Question: " + query }]
        });

        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const options = {
    key: fs.readFileSync("./localhost-key.pem"),
    cert: fs.readFileSync("./localhost.pem")
  };

app.listen(3001, () => console.log("Backend on http://localhost:3001"));