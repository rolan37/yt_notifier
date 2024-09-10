const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const fs = require('fs');
const { mailerSend_API,VERIFIED_MAIL_SENDER, RECIPIENT_EMAIL,RECIPIENT_NAME  } = require('./config');


const mailerSend = new MailerSend({
<<<<<<< HEAD
    apiKey: {mailerSend_API},
=======
    apiKey: '',
>>>>>>> 5886a7781c7e0e9c50da01f3492120951527fdaa
});

const sendMail = async (channelName, videoTitle, videoLink, videoDescription, downloadLink) => {
    console.log('Preparing to send email...');

    const emailHtml = `
        <h1>New Video from ${channelName}</h1>
        <p><strong>Title:</strong> ${videoTitle}</p>
        <p><a href="${videoLink}">Watch it here</a></p>
        <p><strong>Description:</strong></p>
        <p>${videoDescription}</p>
        <button> <a href=${downloadLink}>Download Here</a> </button>
    `;

<<<<<<< HEAD
    const sentFrom = new Sender({VERIFIED_MAIL_SENDER}, "YTNotify"); // Replace with your verified sender's email
    const recipients = [
        new Recipient({RECIPIENT_EMAIL}, {RECIPIENT_NAME})
=======
    const sentFrom = new Sender("", "YTNotify"); // Replace with your verified sender's email
    const recipients = [
        new Recipient(" ", " ")
>>>>>>> 5886a7781c7e0e9c50da01f3492120951527fdaa
    ];

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject(`New Video from ${channelName}: ${videoTitle}`)
        .setHtml(emailHtml);

    try {
        await mailerSend.email.send(emailParams);
        console.log("Email sent successfully.");
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendMail;
