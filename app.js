// external modules
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Set EJS as templating engine
app.set("view engine", "ejs");

// Use body-parser to parse incoming data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Specify the path to static assets
app.use(express.static("public"));
app.use(compression());

app.get("/", (req, res) => res.render("index"));
app.post("/post-contact", (req, res) => {
  const { email, message } = req.body;
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SMTP,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `message from: ${email}`,
    text: message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.send(`
     <div class="full-center">
       <p>Looking forward to get to know you better.</p>
     </div>
   `);
    }
  });
});
app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/resume", (req, res) => res.render("resume"));
app.get("/success", (req, res) => res.render("success"));

app.listen(3000, () => console.log("App listening on port 3000"));
