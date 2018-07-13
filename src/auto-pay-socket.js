/* jshint esversion: 6 */

var io = require('socket.io-client');

const API_TEST = 'https://testnet-api.satoshis.place';

function connect() {
    var sock = io(API_TEST);

    sock.on('connect', function() {
        sock.on('error', handleError);
        sock.on('NEW_ORDER_RESULT', handleNewOrderResult);
    });
}

function handleError(e) {
    console.err('Error occurred: ' + JSON.stringify(e));
}

function handleNewOrderResult(msg) {
    if (typeof msg.data !== 'undefined') {
        lnd.pay(msg.data.paymentRequest);
    } else {
        printer.print('An error occurred: ' + JSON.stringify(msg));
    }
}

function emit(cmd, payload) {
    sock.emit(cmd, payload);
}

module.exports = {
    connect,
    emit
}