const htmlroute = require('express').Router();

const path = require('path');



htmlroute.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
  
  
  htmlroute.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  })
  

module.exports = htmlroute;