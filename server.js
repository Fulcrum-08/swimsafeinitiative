const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// Nodemailer transporter (use Gmail app password!)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "swimsafeinitiative@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD // set in env variable
  }
});

// API endpoint for sign-up requests
app.post("/signup-request", async (req, res) => {
  const { name, email, event } = req.body;

  if (!name || !email || !event) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const mailOptions = {
    from: "swimsafeinitiative@gmail.com",
    to: "swimsafeinitiative@gmail.com",
    subject: "New Sign-Up Request",
    text: `📅 Event: ${event}\n👤 Name: ${name}\n✉️ Email: ${email}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error("Error sending mail:", err);
    res.status(500).json({ success: false, message: "Error sending email" });
  }
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
