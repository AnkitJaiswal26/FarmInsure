const express = require("express");
const cors = require("cors");
const router = express.Router();
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "./config/config.env") });

const { sendMailController } = require("./controllers/mail.controller");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sendMail", sendMailController);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port: ${port}`));
