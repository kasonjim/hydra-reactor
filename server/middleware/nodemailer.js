const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
      user: 'postmaster@sandbox3cef9df6cd7543b396b055d708cff793.mailgun.org',
      pass: 'hrr22hydra'
    }
});

// setup email data with unicode symbols
let mailOptions = {
  from: 'travelwithhydra@gmail.com', // sender address
  to: 'lkaileh@hotmail.com', // list of receivers
  subject: 'You\'ve been invited to plan a trip', // Subject line
  text: 'Please go to http://hydra-travel.herokuapp.com and sign in with your email to help your friends plan a trip' // plain text body
    //html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});