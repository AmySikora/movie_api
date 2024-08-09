const express = require ('express');
const app = express(); 

let topBooks = [
    {
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling'
    }, 
    {
        tile: 'Lord of the Rings',
        author: 'J.R.R. Tolkien'
    },
    {
        title: 'Twlight',
        author: 'Stephaine Meyer'
    }
];

//GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my book club!');
});

app.get('/documentation', (req, res) => {s
    res.sendFile('public/documentation.html', { 
        root: __dirname })
});

//listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.')
});