const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/client/public/index.html'));
});

app.get('/get-products', (req, res) => {
  	var target_url = 'https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products'

	axios.get(target_url)
	  .then(function (response) {
	    // handle success
	    return res.send(response.data)
	  })
	  .catch(function (error) {
	    // handle error
	    console.log(' == error == \n' + error + ' \n');
	    res.send(error)
	  })
	  .then(function () {
	    console.log(' == finish == ');
	  });

})
app.listen(port, HOST);
console.log(`Running on http://${HOST}:${port}`);