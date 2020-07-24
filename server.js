
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const db = require("./db/db.json");
console.log(db);

// routes
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// retrieve notes from db
app.get("/api/notes", function(req, res) {
    res.json(db);
});

// add new note
app.post("/api/notes", function(req, res) {
    const newText = req.body;
    db.push(newText);
    fs.writeFile("db/db.json", JSON.stringify(db), function(){});
    res.json(newText);
});

// delete a note
app.delete("/api/notes/:id", function(req, res) {
    const id = req.params.id;

    for (let i = 0; i < db.length; i++) {
      if (id === db[i].id) {
        console.log(id)
        deletedItem = db.indexOf(db[i])
        db.splice(deletedItem, 1);
        fs.writeFile("db/db.json", JSON.stringify(db), function(){});
        return res.json(id);
      }
    }
})

// listen on server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});