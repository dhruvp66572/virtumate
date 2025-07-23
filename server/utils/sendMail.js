// sendMail.js
const {Resend} = require('resend');


const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (toList, subject, text) => {
  const pLimit = await import('p-limit').then((mod) => mod.default);
  const limit = pLimit(2); // Limit concurrency
  if (!subject || !text || !Array.isArray(toList) || toList.length === 0) {
    console.error("❌ Invalid input to sendMail");
    return;
  }

  const sendEmail = async (email) => {
    try {      
      const res = await resend.emails.send({
        to: await email,
        // from: 'Event Platform <noreply@virtumate.io>',
        from: 'Virtumate <noreply@virtumate.email.dhruvprajapati.tech>', 
        subject,
        html: `<p>${text}</p>`,
        text
      });
      console.log(`✅ Email sent to`, await email);
      console.log(`Email details:`, {
        to: await email,
        subject,
        text
      });
      console.log(`Response:`, res);
      if (res.status !== 202) {
        console.error(`❌ Failed to send email to ${await email}:`, res);
        return null;
      }
      return res;
    } catch (err) {
      console.error(`❌ Failed to send to ${await email}:`, err.message);
      return null;
    }
  };

  const tasks = toList.map(email => limit(() => sendEmail(email)));
  return await Promise.all(tasks);
};

module.exports = sendMail;