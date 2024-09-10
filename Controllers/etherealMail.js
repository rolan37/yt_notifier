// This Controller can be used in place of the sendMail.js 
// 
const nodemailer = require('nodemailer');
const axios = require('axios');

const sendMail= async(req,res)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "ethereal_username_here",
          pass: "ethereal_password",
        },
      });

      const info = await transporter.sendMail({
        from: '"YTnotify" <your_mail@mail.com>', // sender address
        to: "example@receiver.com", // string of receiver or List of receivers
        subject: "Hello ✔", // Subject line
        text: "Modify the Body as you would require for the Notifier Service", // plain text body
        html: "<b>Add your body as raw html</b>", // html body
      });

      const getLatestVideoId = async (channelId) => {
        try {
          const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
              key: API_KEY,
              channelId: channelId,
              part: 'snippet,id',
              order: 'date',
              maxResults: 1,
            }
          });
      
          const items = response.data.items;
          if (items && items.length > 0) {
            return items[0].id.videoId;
          } else {
            return null;
          }
        } catch (error) {
          console.error(`Error fetching latest video for channel ${channelId}:`, error);
          return null;
        }
      };

      console.log("Message sent: %s", info.messageId);
      res.send(`I am sending the Email`)
      res.json(info)
}


module.exports = sendMail