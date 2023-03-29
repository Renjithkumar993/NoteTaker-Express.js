const apinotes = require('express').Router();

const fs = require("fs")
const notes = require ("../db/db.json")








apinotes.get("/", (req, res) => {
    res.json(notes)
  })
  
  
  
  apinotes.get("/:notes_id", (req, res) => {
  
    const requestedID = parseInt(req.params.notes_id);
    for (let i = 0; i < notes.length; i++) {
      if (requestedID === notes[i].id) {
        return res.json(notes[i]);
      }
    }
    return res.status(404).send("Note not found");
  }
  );
  
  
  
  apinotes.post("", (req, res) => {
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
  
  
  apinotes.delete("/:notes_id", (req, res) => {
  
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
  
  
  
  apinotes.put("/:notes_id", (req, res) => {
    const upDateID = parseInt(req.params.notes_id);
    const newTitle = req.body.title;
    const newText = req.body.text;
    for (let i = 0; i < notes.length; i++) {
      if (upDateID === notes[i].id) {
        const updatedNotes = notes.map((note) => {
          if (note.id === upDateID) {
            return {
              title: newTitle,
              text: newText,
              id: upDateID
            };
          } else {
            return note;
          }
        });
        fs.writeFile("./db/db.json", JSON.stringify(updatedNotes), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
          } else {
            res.json(updatedNotes);
          }
        });
        return; 
      }
    }
  });
  

  module.exports = apinotes;