/* jshint esversion: 6 */

var input = require('./src/input');
var socket = require('./src/socket');

socket.connect();
input.start();