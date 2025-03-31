const nodemailer = require("nodemailer");

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dhruvprajapati99090@gmail.com ", // 🔹 Replace with your Gmail
    pass: "mrjd wqob liog ywml", // 🔹 Generate an App Password (not your actual password)
  },
});

/**
 * Send an email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Email body (plain text)
 */
const sendMail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: '"Event Platform" dhruvprajapati99090@gmail.com ', // Sender email
      to,
      subject,
      text,
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = sendMail;
