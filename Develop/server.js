const { json, text } = require('express');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const apinotes =  require ("./routes/apinotesroute")
const htmlroute = require("./routes/htmlroute")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/" , htmlroute);
app.use('/api/notes',apinotes);
app.use(express.static('public'));



app.listen(PORT, () =>
  console.log(`Note Taker application running on http://127.0.0.1:${PORT}/ !`)
);
