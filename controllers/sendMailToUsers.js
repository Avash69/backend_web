const nodemailer = require("nodemailer");
const CustomErrorHandler = require("../errors/customErrorHandler");

//checking this so as to know what to fill in the nodemailern host key
const checkEmailHost = (email) => {
  let host;

  const provider = email.split("@")[1];

  switch (provider) {
    case "gmail.com":
      host = "mahatoavash90@gmail.com";
      break;
    default:
      host = null;
  }

  return host;
};

const sendMessageToUserEmail = async (email, verificationToken, messageData) => {
  const { port, html, pass, secure, text, subject, user } = messageData(verificationToken);

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: user,
      pass: pass,
    },
  });

  await transporter.sendMail(
    {
      from: "Furni" + " <" + user + ">",
      to: email,
      subject: subject,
      text: text,
      html: html,
    },
    (err) => {
      console.log(err);
      throw new CustomErrorHandler("something went wrong");
    }
  );
};

module.exports = { checkEmailHost, sendMessageToUserEmail };
