const express = require('express');
const app = express();
const { Client, LocalAuth } = require('whatsapp-web.js');
var fs = require("fs");
const qri = require('qr-image');
const timestamp = new Date().getTime();
app.use(express.static('public'));


const client = new Client({
	authStrategy: new LocalAuth(),
});

client.initialize();

//GENERATE QR CODE
client.on("qr", (qr) => {
	const qr_svg = qri.image(qr, { type: 'svg' });
	qr_svg.pipe(require('fs').createWriteStream('public/qrimage.svg'));
	const svg_string = qri.imageSync(qr, { type: 'svg' });
	//QR CODE export img
	qri.generate(qr);
});


app.get('/', (req, res) => {
	res.send("<html><img src='qrimage.svg' width='40%' height='40%' ></html>") + timestamp;
});

app.listen(3000, () => {
    console.log("listen 3000");
});


