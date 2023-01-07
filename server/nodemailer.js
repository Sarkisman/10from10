const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'mail',
  port: 587,
  secure: true,
  logger: true,
  debug: true,
  secureConnection: false,
  auth: {
    type: 'OAuth2',
    // user: process.env.MAIL_USERNAME,
    // pass: 'process.env.MAIL_PASSWORD',
    user: 'nodemailertesttest@Mail.ru',
    pass: 'test!@#$',
  },
});

const options = {
  from: 'process.env.MAIL_USERNAME',
  to: 'djodinsky@mail.ru',
  subject: 'sending email with nodejs',
  text: 'wow',
};

transporter.sendMail(options, (err, info) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Sent', info.response);
});
