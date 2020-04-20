const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "bipinkalra@gmail.com",
    subject: "Thanks for joining!",
    text: `Welcome aboard ${name}, hope you find the app useful. :)`
  })
}

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "bipinkalra@gmail.com",
    subject: "What did we do wrong?",
    text: `${name}, we sincerely apologise for any inconvenience caused in our services which forced you to delete your account. Kindly share your valuable reviews with us. Hope to see you back.`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
}

// DEPRECATED CODE FOR LEARNING

// sgMail.send({
//   to: "bipinkalra@gmail.com",
//   from: "bipinkalra@gmail.com",
//   subject: "Test email using sendgrid!",
//   text: "Hope it gets sent!"
// })