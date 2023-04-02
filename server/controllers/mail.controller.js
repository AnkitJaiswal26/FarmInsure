const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.MAIL_KEY);

exports.sendMailController = (req, res) => {
  const { email, data, subject } = req.body;

  const emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject,
    html: data
  };

  sgMail
    .send(emailData)
    .then((sent) => {
      return res.status(200).json({
        message: `Email has been sent to ${email}`,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        error: "Could not send email\n" + err,
      });
    });
};
