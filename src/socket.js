/* jshint esversion: 6 */

var io = require('socket.io-client');
var qrcode = require('qrcode-terminal');
var printer = require('./printer');

API_MAIN = 'https://api.satoshis.place';
API_TEST = 'https://testnet-api.satoshis.place';

var sock;

function connect(url) {
    if (sock != null) {
        sock.disconnect();
    }

    url = typeof url !== 'undefined' ? url : API_MAIN;
    sock = io(url);
    sock.on('connect', function() {
        sock.on('error', handleEvent);
        sock.on('GET_LATEST_PIXELS_RESULT', handleEvent);
        sock.on('GET_SETTINGS_RESULT', handleEvent);
        sock.on('NEW_ORDER_RESULT', handleNewOrderResult);
        sock.on('ORDER_SETTLED', handleEvent);

        printer.print('API Socket connection established with id: ' + sock.id);
    });
}

function handleEvent(msg) {
    printer.print(msg);
}

function handleNewOrderResult(msg) {
    if (typeof msg.data !== 'undefined') {
        qrcode.generate(msg.data.paymentRequest, {small: true});
        printer.print(msg.data);
    } else {
        console.err('An error occurred: ' + JSON.stringify(msg));
    }
}

function emit(cmd, payload) {
    sock.emit(cmd, payload);
}

module.exports = {
    connect,
    emit
};