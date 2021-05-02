const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/How2Go'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/How2Go/index.html')
});

app.listen(PORT, () =>{
    console.log('servidor iniciado na porta: ' + PORT);
});