const { json } = require('express');
const express = require('express');
const PORT = 3001;
const app = express();
const path = require('path');
const notes = require("./db/db.json")
const fs = require("fs")



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get("/api/notes", (req, res) => {
  res.json(notes)
})



app.get("/api/notes/:notes_id", (req, res) => {

  const requestedID = parseInt(req.params.notes_id);
  for (let i = 0; i < notes.length; i++) {
    if (requestedID === notes[i].id) {
      return res.json(notes[i]);
    }
  }
  return res.status(404).send("Note not found");
}
);



app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = { title, text, id: notes.length + 1 };

    notes.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
      } else {
        res.json(notes);
      }
    });
  }
});


app.delete("/api/notes/:notes_id", (req, res) => {

  const deleteID = parseInt(req.params.notes_id);
  for (let i = 0; i < notes.length; i++) {
    if (deleteID === notes[i].id) {
      res.json(notes.splice(i, 1))
      fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
        }
      }
      )
    }
  }


})














app.listen(PORT, () =>
  console.log(`Serving static asset routes on port http://127.0.0.1:${PORT}/ !`)
);
