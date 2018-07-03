/* jshint esversion: 6 */

var image = require('./image');
var socket = require('./socket');

const cmds = {
    "settings": 'GET_SETTINGS',
    "pixels": 'GET_LATEST_PIXELS'
}

function start() {
    process.openStdin().addListener("data", handle);
}

function handle(data) {
    var args = data.toString().trim().split(" ");

    switch (args[0]) {
        case 'new':
            image.send(args);
            break;
        case 'set':
            url = args[1] === "main" ? API_MAIN : API_TEST;
            socket.connect(url);
            break;
        case 'exit':
            process.exit();
            break;
        default:
            socket.emit(cmds[args[0]]);
    }
}

module.exports = {
    start
};