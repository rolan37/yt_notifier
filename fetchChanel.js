const { google } = require('googleapis');
const fs = require('fs');
const { YOUTUBE_API_KEY } = require('./config');

// List of YouTube URLs with handles
const channelUrls = [
    "https://www.youtube.com/@20thCenturyStudiosES",
    "https://www.youtube.com/@20thCenturyStudiosHomeEntES",
    "https://www.youtube.com/@acontrafilms",
    "https://www.youtube.com/@PrimeVideoES",
    "https://www.youtube.com/@PrimeVideoMX",
    "https://www.youtube.com/@primevideolatinoamerica",
    "https://www.youtube.com/@AppleEspana",
    "https://www.youtube.com/@AppleMexico",
    "https://www.youtube.com/@betafictionspain",
    "https://www.youtube.com/@CineCANIBAL",
    "https://www.youtube.com/@CorazonFilms",
    "https://www.youtube.com/@DiamondFilmsEs",
    "https://www.youtube.com/@DiamondFilmsLatam",
    "https://www.youtube.com/@disneyspain",
    "https://www.youtube.com/@DisneyStudiosLA",
    "https://www.youtube.com/@disneyplusla",
    "https://www.youtube.com/@disneypluses",
    "https://www.youtube.com/DreamWorksTVEspañol",
    "https://www.youtube.com/@KarmaFilmsCine",
    "https://www.youtube.com/@marveles",
    "https://www.youtube.com/@MarvelLatino",
    "https://www.youtube.com/@StreamMaxLA",
    "https://www.youtube.com/@StreamMaxES",
    "https://www.youtube.com/@MorenaFilmsCine",
    "https://www.youtube.com/@ParamountMexico",
    "https://www.youtube.com/@ParamountPicturesES",
    "https://www.youtube.com/@paramountplusmx",
    "https://www.youtube.com/user/EspacioSony",
    "https://www.youtube.com/@SonyPicturesLatam",
    "https://www.youtube.com/@SonypicturesMexicoOficial",
    "https://www.youtube.com/StarWarsES/videos",
    "https://www.youtube.com/@StarWarsLA",
    "https://www.youtube.com/user/tripictures",
    "https://www.youtube.com/@UniversalPicsLatino",
    "https://www.youtube.com/@universalpicturesmx",
    "https://www.youtube.com/@Universal_Spain",
    "https://www.youtube.com/@VerticeCine",
    "https://www.youtube.com/@videocine",
    "https://www.youtube.com/@filmsvertigo",
    "https://www.youtube.com/c/WarnerBrosPicturesEspaña",
    "https://www.youtube.com/@WarnerBrosPicturesLA",
    "https://www.youtube.com/@youplanetpictures"
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
