const express = require('express');
const path = require('path'); // Import the 'path' module
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views/'));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/horario', (req, res) => {
    res.render('horario');
})

app.get('/contato', (req, res) => {
    res.render('contato');
})

app.listen(port, function(error) {
    if (error) {
        console.log('Error running the server');
    }
    console.log('Server is running on port', 3000);
    console.log(`http://localhost:${port}`)
});