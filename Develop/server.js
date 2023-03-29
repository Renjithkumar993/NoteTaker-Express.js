const { json, text } = require('express');
const express = require('express');
const PORT = 3001;
const app = express();
const path = require('path');
const apinotes =  require ("./routes/apinotes")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes',apinotes);
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
})


app.listen(PORT, () =>
  console.log(`Note Taker application running on http://127.0.0.1:${PORT}/ !`)
);
