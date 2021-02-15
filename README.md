# signwebapp

This application starts a web server, allowing a mobile device to connect and
enter a signature in the provided drawing area. The signature can then be sent
back to the host as a `signature.png` for the use in forms.

## Build
```go build -o signwebapp ./src```

Then execute the binary `signwebapp` by typing its name in the terminal.

## Use
Run the webserver binary, it will output the IP:Port you need to visit.
On your phone, open the website by entering given IP:Port. Sign and press `Transfer`.
To clear the canvas, reload the page.

In order to use the whole screen area, in your phone's browser select
`Add to Homepage` (this might not work with iOS devices). The icon that
appears on your home screen will now open up the website in fullscreen
as long as the IP adress stays the same.
