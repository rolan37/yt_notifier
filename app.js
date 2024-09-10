// index.js
const express = require('express');
const checkForNewVideos = require('./Utils/youtubeMonitor');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send('The application is up and running');
});

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });

        // Check for new videos every 30 minutes 
        setInterval(checkForNewVideos,  30 * 60 * 1000);
    } catch (error) {
        console.log('Something went wrong', error);
    }
};

start();
