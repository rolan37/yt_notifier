const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const mailerSend = new MailerSend({
    apiKey: '',
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

    const sentFrom = new Sender("", "YTNotify"); // Replace with your verified sender's email
    const recipients = [
        new Recipient(" ", " ")
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
