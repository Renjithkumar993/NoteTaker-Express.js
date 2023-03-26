const express = require('express');
const PORT = 3001;
const app = express();
const path = require('path');
const notes = require("./db/db.json")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  

app.get('/notes' ,(req,res) =>{
    res.sendFile(path.join(__dirname, './public/notes.html'));
    return notes
})

















app.listen(PORT, () =>
console.log(`Serving static asset routes on port http://127.0.0.1:${PORT}/ !`)
);
