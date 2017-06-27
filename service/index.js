const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const clients = require('./clients');
const searchController = require('./controllers/SearchController');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routes
app.get('/search/quick', searchController);

//Run all client states
clients.run()
    .then(() =>{
    app.listen(3000, () => {
        console.log('UI 8080!');
        console.log('SERVICE 3000!');
    })
});
