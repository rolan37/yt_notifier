const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const mailerSend = new MailerSend({
    apiKey: 'mlsn.5c75379dcc7b7a6f228a45e3e63c681432cf47d7869f2dfe7fae4cbdc289db97',
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

    const sentFrom = new Sender("MS_ZMHPCd@trial-pxkjn41rxn6gz781.mlsender.net", "YTNotify"); // Replace with your verified sender's email
    const recipients = [
        new Recipient("codingsimplified7@gmail.com", "Rolan Pereira")
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
