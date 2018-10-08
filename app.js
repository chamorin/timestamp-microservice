const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

var app = module.exports = express();
app.unsubscribe(bodyParser.json());
app.use(cors());

const dateFormating = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

app.get('/timestamp', (req, res) => {
    var readableDate = new Date();
    readableDate = readableDate.toLocaleDateString('en-us', dateFormating);
    var unixDate = new Date(readableDate).getTime() / 1000;

    res.json({ unix: unixDate, readable: readableDate });
});

app.get('/timestamp/:dateVal', (req, res) => {
    var dateVal = req.params.dateVal;

    if (isNaN(dateVal)) {
        var readableDate = new Date(dateVal);
        readableDate = readableDate.toLocaleDateString('en-us', dateFormating);
        var unixDate = new Date(dateVal).getTime() / 1000;
    } else {
        var unixDate = dateVal;
        var readableDate = new Date(dateVal * 1000);
        readableDate = readableDate.toLocaleDateString('en-us', dateFormating);
    }

    res.json({ unix: unixDate, readable: readableDate });
});

app.listen(3000, () => {
    console.log('Server is up');
});