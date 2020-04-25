const sgMail = require('@sendgrid/mail');
const env = require('dotenv');

env.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const welcomeMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'admin@telemed.com',
        subject: `Welcome to Telemed ${name}`,
        html: ` <strong>Congratulations </strong> ${name} you have successfully registered for telemed health app. 
            The one app that provides a wide range of medical services and consultations. This proves that you have taken 
            the best decision pertaining safe guarding your health. `

    })
}

module.exports = {
    welcomeMail
};