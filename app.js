const express = require("express");
const fs = require("fs");

// express app
const app = express();

// listen for request (return an instance of the server)
app.listen(3000);

// app.get listen for get request take the url in parametere and the callback function
app.get("/", (req, res) => {
  // res.send automatically determine the type of content that we gonna send so
  // we don't need to specify the Content-Type in the header
  // res.send also automatically handle de response code
  // res.send("<p>Home</p>");

  // sendFile allow us the send html file to the client
  // with an absolute path
  // ici les deux chemin son concateé pour formé un chemin absolu
  // on obtient le chemin de notre root en appelant l'objet gloabl __dirname
  // qui est concaténé par la methode sendFile a notre chemin relatif pour former
  // un chemin absolue
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

// redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});
