# Satoshi's Place Command Line Interface
This CLI gives you control over all functionality of Satoshi's Place.   
Right there in your command line!  
It makes it easy to upload images too!

## Setting up the CLI
No `npm` package is deployed yet. Therefore you have to run the CLI locally.

1. Install all packages with `npm install`. 
2. Start the CLI with `node main.js`

## Commands
You can use the following commands

### `settings`
Refers to `GET_SETTINGS`. Retrieves the latest settings.

### `pixels`
Refers to `GET_LATEST_PIXELS`. Retrieves the latest pixels drawn.

### `set main` or `set test`
Toggles between `testnet` and `production` of the Satoshi's Place application.

### `new IMAGE_NAME` or `new IMAGE_NAME DX DY`
E.g. `new example.png` or `new example.png 450 450` to print the image at x: 450, y:450.

Refers to `NEW_ORDER`. Loads and sends an image to Satosh's Place. Change the position of where the image is printed with the `DX` for x coordinates and `DY` for y coordinates. It will print out the Lightning Payment Request, which you can copy into a wallet like [Zap](https://zap.jackmallers.com/).

### `exit`
Exits the CLI.

## Support
If you want to support the development of this CLI, have a look at the Issues.  
PRs are always welcome and much appreciated :-)

I'm German. I like beer. If you like this, why don't you buy me one? :-)   
`39uatVcmedQPWMeGWWGomUpf5AYdg6c2Gn`