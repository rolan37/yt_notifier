// List of YouTube URLs with handles
const { google } = require('googleapis');
const fs = require('fs');
const { YOUTUBE_API_KEY } = require('./config');

const channelUrls = [
    "https://www.youtube.com/20thCenturyStudiosES",
    "https://www.youtube.com/20thCenturyStudiosHomeEntES",
    "https://www.youtube.com/@acontrafilms",
    "https://www.youtube.com/PrimeVideoES",
    "https://www.youtube.com/PrimeVideoMX",
    "https://www.youtube.com/primevideolatinoamerica",
    "https://www.youtube.com/AppleEspana",
    "https://www.youtube.com/AppleMexico",
    "https://www.youtube.com/betafictionspain",
    "https://www.youtube.com/CineCANIBAL",
    "https://www.youtube.com/@CorazonFilms",
    "https://www.youtube.com/DiamondFilmsEs",
    "https://www.youtube.com/DiamondFilmsLatam",
    "https://www.youtube.com/disneyspain",
    "https://www.youtube.com/DisneyStudiosLA",
    "https://www.youtube.com/disneyplusla",
    "https://www.youtube.com/disneypluses",
    "https://www.youtube.com/DreamWorksTVEspañol",
    "https://www.youtube.com/KarmaFilmsCine",
    "https://www.youtube.com/@marveles",
    "https://www.youtube.com/@MarvelLatino",
    "https://www.youtube.com/StreamMaxLA",
    "https://www.youtube.com/StreamMaxES",
    "https://www.youtube.com/@MorenaFilmsCine",
    "https://www.youtube.com/@ParamountMexico",
    "https://www.youtube.com/@ParamountPicturesES",
    "https://www.youtube.com/paramountplusmx",
    "https://www.youtube.com/user/EspacioSony",
    "https://www.youtube.com/@SonyPicturesLatam",
    "https://www.youtube.com/SonypicturesMexicoOficial",
    "https://www.youtube.com/StarWarsES",
    "https://www.youtube.com/@StarWarsLA",
    "https://www.youtube.com/tripictures",
    "https://www.youtube.com/@UniversalPicsLatino",
    "https://www.youtube.com/@universalpicturesmx",
    "https://www.youtube.com/Universal_Spain",
    "https://www.youtube.com/@VerticeCine",
    "https://www.youtube.com/@videocine",
    "https://www.youtube.com/@filmsvertigo",
    "https://www.youtube.com/WarnerBrosPicturesEspaña",
    "https://www.youtube.com/@WarnerBrosPicturesLA",
    "https://www.youtube.com/@youplanetpictures",
    "https://www.youtube.com/20thCenturyStudiosDE",
    "https://www.youtube.com/@ParamountGermany",
    "https://www.youtube.com/@UniversalPicturesDE",
    "https://www.youtube.com/@SonyPicturesGermany",
    "https://www.youtube.com/DisneyDeutschlandDE",
    "https://www.youtube.com/WarnerBrosDE",
    "https://www.youtube.com/DCDeutschland",
    "https://www.youtube.com/@MarvelDE",
    "https://www.youtube.com/@Netflixdach",
    "https://www.youtube.com/AppleDeutschland",
    "https://www.youtube.com/PrimeVideoDE",
    "https://www.youtube.com/PixarDE",
    "https://www.youtube.com/ParamountPlusDE",
    "https://www.youtube.com/@constantinfilm",
    "https://www.youtube.com/STUDIOCANALGermany",
    "https://www.youtube.com/ufa_production",
    "https://www.youtube.com/TOBISFilm",
    "https://www.youtube.com/@WildBunchGermany",
    "https://www.youtube.com/telepool1393",
    "https://www.youtube.com/kinostarfilmverleihgmbh8889",
    "https://www.youtube.com/@visionen1997",
    "https://www.youtube.com/splendidfilmbnl",
    "https://www.youtube.com/@capelightpictures",
    "https://www.youtube.com/@xverleih",
    "https://www.youtube.com/filmweltverleih",
    "https://www.youtube.com/MajesticFilmverleih",
    "https://www.youtube.com/@polyband",
    "https://www.youtube.com/@PifflMedien",
    "https://www.youtube.com/@arsenalfilm",
    "https://www.youtube.com/@farbfilmverleih",
    "https://www.youtube.com/CaminoFilmverleihStuttgart",
    "https://www.youtube.com/20thCenturyStudiosDE",
    "https://www.youtube.com/@ParamountGermany",
    "https://www.youtube.com/@UniversalPicturesDE",
    "https://www.youtube.com/@SonyPicturesGermany",
    "https://www.youtube.com/DisneyDeutschlandDE",
    "https://www.youtube.com/WarnerBrosDE",
    "https://www.youtube.com/DCDeutschland",
    "https://www.youtube.com/@MarvelDE",
    "https://www.youtube.com/@Netflixdach",
    "https://www.youtube.com/@AppleDeutschland",
    "https://www.youtube.com/@PrimeVideoDE",
    "https://www.youtube.com/@PixarDE",
    "https://www.youtube.com/@ParamountPlusDE",
    "https://www.youtube.com/@constantinfilm",
    "https://www.youtube.com/@STUDIOCANALGermany",
    "https://www.youtube.com/@ufa_production",
    "https://www.youtube.com/@TOBISFilm",
    "https://www.youtube.com/@WildBunchGermany",
    "https://www.youtube.com/@telepool1393",
    "https://www.youtube.com/@kinostarfilmverleihgmbh8889",
    "https://www.youtube.com/@visionen1997",
    "https://www.youtube.com/@splendidfilmbnl",
    "https://www.youtube.com/@capelightpictures",
    "https://www.youtube.com/@xverleih",
    "https://www.youtube.com/@filmweltverleih",
    "https://www.youtube.com/@MajesticFilmverleih",
    "https://www.youtube.com/@polyband",
    "https://www.youtube.com/@PifflMedien",
    "https://www.youtube.com/@arsenalfilm",
    "https://www.youtube.com/@farbfilmverleih",
    "https://www.youtube.com/@CaminoFilmverleihStuttgart",
    "https://www.youtube.com/@20thCenturyStudios",
    "https://www.youtube.com/@paramountpictures",
    "https://www.youtube.com/@paramountmovies/videos",
    "https://www.youtube.com/@UniversalPictures",
    "https://www.youtube.com/@universalpicturesuk",
    "https://www.youtube.com/@sonypictures/videos",
    "https://www.youtube.com/@SonyPicsUK",
    "https://www.youtube.com/@SonyAnimation",
    "https://www.youtube.com/@SonyPicturesClassics",
    "https://www.youtube.com/@DisneyMovieTrailers",
    "https://www.youtube.com/@disneyplus",
    "https://www.youtube.com/@disneyanimation",
    "https://www.youtube.com/@WarnerBrosPictures",
    "https://www.youtube.com/@dcofficial/videos",
    "https://www.youtube.com/@marvel",
    "https://www.youtube.com/@A24",
    "https://www.youtube.com/@HBO",
    "https://www.youtube.com/@Netflix",
    "https://www.youtube.com/@AppleTV",
    "https://www.youtube.com/@PrimeVideo",
    "https://www.youtube.com/@PrimeVideoUK",
    "https://www.youtube.com/@LionsgateMovies",
    "https://www.youtube.com/@AmazonMGMStudios/videos",
    "https://www.youtube.com/@pixar",
    "https://www.youtube.com/@Lucasfilm",
    "https://www.youtube.com/@FocusFeatures",
    "https://www.youtube.com/@miramax",
    "https://www.youtube.com/@Blumhouse",
    "https://www.youtube.com/@STXFilms",
    "https://www.youtube.com/@20thCenturyStudios",
    "https://www.youtube.com/@paramountpictures",
    "https://www.youtube.com/@paramountmovies/videos",
    "https://www.youtube.com/@UniversalPictures",
    "https://www.youtube.com/@universalpicturesuk",
    "https://www.youtube.com/@sonypictures/videos",
    "https://www.youtube.com/@SonyPicsUK",
    "https://www.youtube.com/@SonyAnimation",
    "https://www.youtube.com/@SonyPicturesClassics",
    "https://www.youtube.com/@DisneyMovieTrailers",
    "https://www.youtube.com/@disneyplus",
    "https://www.youtube.com/@disneyanimation",
    "https://www.youtube.com/@WarnerBrosPictures",
    "https://www.youtube.com/@dcofficial/videos",
    "https://www.youtube.com/@marvel",
    "https://www.youtube.com/@A24",
    "https://www.youtube.com/@HBO",
    "https://www.youtube.com/@Netflix",
    "https://www.youtube.com/@AppleTV",
    "https://www.youtube.com/@PrimeVideo",
    "https://www.youtube.com/@PrimeVideoUK",
    "https://www.youtube.com/@LionsgateMovies",
    "https://www.youtube.com/@AmazonMGMStudios/videos",
    "https://www.youtube.com/@pixar",
    "https://www.youtube.com/@Lucasfilm",
    "https://www.youtube.com/@FocusFeatures",
    "https://www.youtube.com/@miramax",
    "https://www.youtube.com/@Blumhouse",
    "https://www.youtube.com/@STXFilms/",
    "https://www.youtube.com/@radioactivepictures",
    "https://www.youtube.com/@BBC",
    "https://www.youtube.com/@sabanfilms4890",
    "https://www.youtube.com/@shudder",
    "https://www.youtube.com/@highlandfilmgroup",
    "https://www.youtube.com/@mubi",
    "https://www.youtube.com/@PassionflixChannel",
    "https://www.youtube.com/@vivapictures",
    "https://www.youtube.com/@TheAsylumMovieChannel",
    "https://www.youtube.com/@legendary/videos",
    "https://www.youtube.com/@neonrated",
    "https://www.youtube.com/@oscopelabs",
    "https://www.youtube.com/@openroadfilms",
    "https://www.youtube.com/@GunpowderSky",
    "https://www.youtube.com/@gravitasventuresVOD",
    "https://www.youtube.com/@darkskyfilms",
    "https://www.youtube.com/@stillwatchingnetflix",
    "https://www.youtube.com/@netflixanime",
    "https://www.youtube.com/@StreamOnMax",
    "https://www.youtube.com/@Vertical_Official",
    "https://www.youtube.com/GiantPictures",
];

// Extract identifier from YouTube URL
const extractIdentifier = (url) => {
    const handlePattern = /@([a-zA-Z0-9_-]+)/;
    const channelPattern = /channel\/([a-zA-Z0-9_-]+)/;
    const userPattern = /user\/([a-zA-Z0-9_-]+)/;
    const customPattern = /c\/([a-zA-Z0-9_-]+)/;
    const linkPattern = /([a-zA-Z0-9_-]+)/;

    let match = url.match(handlePattern) || url.match(channelPattern) || url.match(userPattern) || url.match(customPattern) || url.match(linkPattern);
    return match ? match[1] : null;
};

// Fetch channel ID using YouTube API
const fetchChannelIdByIdentifier = async (identifier, type) => {
    const youtube = google.youtube({
        version: 'v3',
        auth: YOUTUBE_API_KEY
    });

    try {
        const response = await youtube.channels.list({
            part: 'id',
            ...(type === 'handle' ? { forUsername: identifier } : { id: identifier })
        });

        if (response.data && response.data.items && response.data.items.length > 0) {
            return response.data.items[0].id;
        } else {
            throw new Error(`No channel found for identifier: ${identifier}`);
        }
    } catch (error) {
        console.error(`Error fetching channel ID for identifier ${identifier}:`, error.message);
        logFailedChannel(identifier, error.message);
        return null;
    }
};

// Write failed channels to log file
const logFailedChannel = (identifier, error) => {
    const logMessage = `Failed to fetch channel ID for ${identifier}: ${error}\n`;
    fs.appendFileSync('failed_channels.log', logMessage);
};

// Process each URL and fetch the corresponding channel ID
const fetchAllChannelIds = async () => {
    let channelData = {};

    for (const url of channelUrls) {
        const identifier = extractIdentifier(url);
        if (identifier) {
            const isHandle = url.includes('@');
            const type = isHandle ? 'handle' : 'channelId';

            console.log(`Fetching channel ID for ${isHandle ? 'handle' : 'channel ID'}: ${identifier}`);
            const channelId = await fetchChannelIdByIdentifier(identifier, type);
            if (channelId) {
                channelData[identifier] = channelId;
                console.log(`Channel ID for ${identifier}: ${channelId}`);
            }
        } else {
            console.log(`No valid identifier found in URL: ${url}`);
            logFailedChannel(url, "No valid identifier");
        }
    }

    // Save channel data to a JSON file
    fs.writeFileSync('channel_ids.json', JSON.stringify(channelData, null, 2));
    console.log('Channel IDs saved to channel_ids.json');
};

// Run the fetch process
fetchAllChannelIds();