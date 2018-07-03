/* jshint esversion: 6 */

function print(text) {
    console.log(text);
    newLine();
}

function newLine() {
    process.stdout.write("> ");
}

module.exports = {
    print,
    newLine
}