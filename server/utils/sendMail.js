const nodemailer = require("nodemailer");

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID, // 🔹 Replace with your Gmail
    pass: process.env.EMAIL_PASSWORD, // 🔹 Generate an App Password (not your actual password)
  },
});

/**
 * Send an email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Email body (plain text)
 */
const sendMail = async (to, subject, text) => {

  console.log("Sending email to in mail function :", to);

  // Validate email address
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailRegex.test(to)) {
  //   console.error("❌ Invalid email address:", to);
  //   return;
  // }

  // Validate subject and text
  if (!subject || !text) {
    console.error("❌ Subject and text are required for sending an email.");
    return;
  }
  ;

  // Send email
  console.log(`📧 Sending email to ${to}...`);
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

module.exports = sendMail ;
