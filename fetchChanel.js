// run this script if you want to find the channel ids of a channel.
// you will need their channel link and then this script will do the rest
const { google } = require('googleapis');
const fs = require('fs');
const { YOUTUBE_API_KEY } = require('./config');

// List of YouTube URLs with handles
const channelUrls = [
    "https://www.youtube.com/@20thCenturyStudiosES",
    "https://www.youtube.com/@20thCenturyStudiosHomeEntES",
    "https://www.youtube.com/@acontrafilms"
];



// Extract handle from YouTube URL
const extractHandle = (url) => {
    const handlePattern = /@([a-zA-Z0-9_-]+)/;
    const match = url.match(handlePattern);
    return match ? match[1] : null;
};

// Fetch channel ID using the handle
const fetchChannelIdByHandle = async (handle) => {
    const youtube = google.youtube({
        version: 'v3',
        auth: YOUTUBE_API_KEY
    });

    try {
        const response = await youtube.channels.list({
            part: 'id',
            forUsername: handle
        });

        if (response.data.items.length > 0) {
            return response.data.items[0].id;
        } else {
            throw new Error(`Channel not found for handle: ${handle}`);
        }
    } catch (error) {
        console.error(`Error fetching channel ID for handle ${handle}:`, error.message);
        return null;
    }
};

// Process each URL and fetch the corresponding channel ID
const fetchAllChannelIds = async () => {
    let channelData = {};

    for (const url of channelUrls) {
        const handle = extractHandle(url);
        if (handle) {
            console.log(`Fetching channel ID for handle: ${handle}`);
            const channelId = await fetchChannelIdByHandle(handle);
            if (channelId) {
                channelData[handle] = channelId;  // Save handle and channel ID to the object
                console.log(`Channel ID for ${handle}: ${channelId}`);
            }
        } else {
            console.log(`No handle found in URL: ${url}`);
        }
    }

    // Save channel data to a JSON file
    fs.writeFileSync('channel_ids.json', JSON.stringify(channelData, null, 2));
    console.log('Channel IDs saved to channel_ids.json');
};

// Run the fetch process
fetchAllChannelIds();
