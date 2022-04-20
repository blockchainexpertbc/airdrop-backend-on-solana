import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv"
import fileRouter from "./src/routes/file.router.js";
import airdropRouter from "./src/routes/airdrop.router.js"

config();

const app = express();
fileRouter(app);
airdropRouter(app);

app.all("*", (req, res) => {
  console.log(req.body)
  res.send("success")
})
app.get('/api', (req, res) => res.send('Home Page Route'));

var corsOptions = {
  origin: "*"
};

// app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

export default app;