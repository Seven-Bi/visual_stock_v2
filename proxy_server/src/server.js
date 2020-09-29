const express = require('express');
const axios = require('axios');
const app = express();



app.get('/get-products', (req, res) => {
  	var target_url = 'https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products'

	axios.get(target_url)
	  .then(function (response) {
	    // handle success
	    return res.send(response)
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


const PORT = '3001';
app.listen(PORT, () => console.log(`listening on ${PORT}`));