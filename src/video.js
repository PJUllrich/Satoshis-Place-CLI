/* jshint esversion: 6 */

const ffmpeg = require('fluent-ffmpeg');
const getPixels = require('get-pixels');
const image = require('./image');
const autoPaySocket = require('./auto-pay-socket');

const TMP_FOLDER = './tmp/';
const OUT_SIZE = '250x?';
const NUM_IMAGES = 20;

const DX = 700;
const DY = 700; 

function load(filename) {
    console.log('Starting to load video');
    const frames = ffmpeg(filename)
    .on('filenames', function(filenames) {
        loadFrames(filenames);
    })
    .on('error', function(err) {
        console.err('Error occurred: ' + err.message);
    })
    .screenshots({
        count: NUM_IMAGES,
        size: OUT_SIZE,
        folder: TMP_FOLDER
    });
}

function loadFrames(filenames) {
    var frames = [];
    console.log('Converting frames to JSON');
    filenames.forEach(filename => {
        getPixels(TMP_FOLDER + filename, function(err, content) {
            frames.push(image.toPixelInfo(content, DX, DY));
            if (frames.length == NUM_IMAGES) {
                play(frames);
            }
        });
    });
}

function play(frames) {
    console.log('Connecting to Satoshis Place - Testnet');
    autoPaySocket.connect();

    console.log('Starting to play video. Go to testnet.satoshis.place ');
    var counter = 0;
    setInterval(function() {
        var frame = frames[counter % NUM_IMAGES];
        autoPaySocket.emit('NEW_ORDER', frame);
    }, 1000);
}

module.exports = {
    load
};
