var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) {
   res.send('Reached homepage'); 
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log('Supernotes server started..'); 
});