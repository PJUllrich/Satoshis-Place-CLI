/* jshint esversion: 6 */

var getPixels = require("get-pixels");
var socket = require('./socket');

var colors = {
    1: '#ffffff',
    2: '#e4e4e4',
    3: '#888888',
    4: '#222222',
    5: '#e4b4ca',
    6: '#d4361e',
    7: '#db993e',
    8: '#8e705d',
    9: '#e6d84e',
    10: '#a3dc67',
    11: '#4aba38',
    12: '#7fcbd0',
    13: '#5880a8',
    14: '#3919d1',
    15: '#c27ad0',
    16: '#742671'
  };

var nearestColor = require('nearest-color').from(colors);

function send(args) {
    var filename = args[1];
    var dx = 0, dy = 0;
    if (args.length > 2) {
        dx = parseInt(args[2]);
        dy = parseInt(args[3]);
    }

    getPixels(filename, function(err, content) {
        var data = [];
        var counter = 0;
        for (var y = 0; y < content.shape[1]; y++) {
            for (var x = 0; x < content.shape[0]; x++) {
                start = counter * 4;
                r = content.data[start];
                g = content.data[start+1];
                b = content.data[start+2];

                var hex = "#" + toHex(r) + toHex(g) + toHex(b);
                var color = nearestColor(hex).value;
                data.push({"coordinates": [x + dx, y + dy], "color": color});
                counter++;
            }
        }
        socket.emit('NEW_ORDER', data);
    });
}

function toHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

module.exports = {
    send
};