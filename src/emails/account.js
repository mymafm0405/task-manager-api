const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeMessage = (email, name) => {
    sgMail.send({
        to: email,
        from: 'mymafm04052014@gmail.com',
        subject: 'Thanks for joining our Task App!',
        text: `Welcome to our app ${name} and wish you the best experience with it.`
    })
}

const sendCancelationMessage = (email, name) => {
    sgMail.send({
        to: email,
        from: 'mymafm04052014@gmail.com',
        subject: 'Sorry to see you go!',
        text: `We feel sorry to see you go ${name} and hope to join us back again in the future.`
    })
}

module.exports = {
    sendWelcomeMessage,
    sendCancelationMessage
}