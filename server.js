const express = require('express'),
  morgan = require('morgan');
  fs = require('fs'), // import built un node modules fs and path
  path = require('path');

const app = express();
//create a write stream in append mode
// a 'log.txt' file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
app.use(morgan('common'));

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

const bodyParser = require('body-parser'),
    methodOverride = require('method-overide');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
    //logic
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
