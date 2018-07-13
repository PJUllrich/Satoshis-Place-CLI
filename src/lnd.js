/* jshint esversion: 6 */

var grpc = require('grpc');
var fs = require('fs');

process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA';

//  Lnd cert is at ~/.lnd/tls.cert on Linux and
//  ~/Library/Application Support/Lnd/tls.cert on Mac
const CERT_PATH = '~/Library/Application Support/Lnd/tls.cert';

var lndCert = fs.readFileSync(CERT_PATH);
var credentials = grpc.credentials.createSsl(lndCert);
var lnrpcDescriptor = grpc.load("rpc.proto");
var lnrpc = lnrpcDescriptor.lnrpc;
var lightning = new lnrpc.Lightning('localhost:10009', credentials);

function pay(request) {
    lightning.listPeers({}, function(err, res) {
        console.log(res);
    });
}

module.exports = {
    pay
};