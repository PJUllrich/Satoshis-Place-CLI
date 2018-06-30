/* jshint esversion: 6 */

var image = require('./image');
var io = require('socket.io-client');

const cmds = {
    "settings": 'GET_SETTINGS',
    "pixels": 'GET_LATEST_PIXELS'
}

API_MAIN = 'https://api.satoshis.place';
API_TEST = 'https://testnet-api.satoshis.place';

var socket;

function setSocket(url) {
    if (socket != null) {
        socket.disconnect();
    }

    socket = io(url);
    socket.on('connect', a => {
        console.log('API Socket connection established with id', socket.id);
        socket.on('error', handleEvent);
        socket.on('GET_LATEST_PIXELS_RESULT', handleEvent);
        socket.on('GET_SETTINGS_RESULT', handleEvent);
        socket.on('NEW_ORDER_RESULT', handleEvent);
        socket.on('ORDER_SETTLED', handleEvent);

        if (process.openStdin().listenerCount("data") == 0) {
            startInput();
        }

        process.stdout.write("> ");
    });
}

function handleEvent(msg) {
    console.log(msg);
    process.stdout.write("> ");
}

function startInput() {
    process.openStdin().addListener("data", handleInput);
    console.log("You can now enter commands");
}

function handleInput(data) {
    var args = data.toString().trim().split(" ");

    switch (args[0]) {
        case 'new':
            image.send(socket, args);
            break;
        case 'set':
            url = args[1] === "main" ? API_MAIN : API_TEST;
            setSocket(url);
            break;
        case 'exit':
            process.exit();
            break;
        default:
            socket.emit(cmds[args[0]]);
    }
}

setSocket(API_MAIN);