// /Utils/youtubeMonitor.js
const { google } = require('googleapis');
const sendMail = require('../Controllers/sendMail');
const { YOUTUBE_API_KEY, CHANNEL_IDS } = require('../config');

let lastVideoIds = {}; // Store the last notified video IDs for each channel

const checkForNewVideos = async () => {
    const youtube = google.youtube({
        version: 'v3',
        auth: YOUTUBE_API_KEY
    });

    for (const channelId of CHANNEL_IDS) {
        try {
            console.log(`Checking channel: ${channelId}`);  // Log channel being checked

            // Step 1: Get the uploads playlist ID for the channel
            const channelResponse = await youtube.channels.list({
                id: channelId,
                part: 'contentDetails'
            });
            
            const uploadsPlaylistId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;

            // Step 2: Get the latest video from the uploads playlist
            const playlistResponse = await youtube.playlistItems.list({
                playlistId: uploadsPlaylistId,
                part: 'snippet',
                maxResults: 1
            });

            const latestVideo = playlistResponse.data.items[0];
            const videoId = latestVideo.snippet.resourceId.videoId;

            console.log(`Latest video ID for channel ${channelId}: ${videoId}`);

            if (!lastVideoIds[channelId] || videoId !== lastVideoIds[channelId]) {
                lastVideoIds[channelId] = videoId;  // Update the last video ID for this channel
                const videoTitle = latestVideo.snippet.title;
                const videoDescription = latestVideo.snippet.description;
                const videoLink = `https://www.youtube.com/watch?v=${videoId}`;
                const downloadLink = `https://www.youtubepp.com/watch?v=${videoId}`;
                const channelName = latestVideo.snippet.channelTitle;

                console.log(`New video detected: ${videoTitle} from ${channelName}`);

                // Send the email
                await sendMail(channelName, videoTitle, videoLink, videoDescription,downloadLink);

                console.log(`Email sent for video: ${videoTitle}`);
            } else {
                console.log(`No new videos found for channel: ${channelId}`);
            }
        } catch (error) {
            console.error(`Error checking channel ${channelId}:`, error);
        }
    }
};

module.exports = checkForNewVideos;
