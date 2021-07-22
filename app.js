const express = require("express");
const fs = require("fs");

// express app
const app = express();

// register view engine
// par default express va chercher nos vue dans le dossier views
app.set("view engine", "ejs");
// si l'on souhaite changer le dossier par default run la cmd suivante
// app.set("views", 'myViews')

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
  // res.sendFile("./views/index.html", { root: __dirname });

  const blogs = [
    { title: "Yoshi finds eggs", snippet: "lorem ipsum" },
    { title: "Yoshi finds french fries", snippet: "lorem ipsum" },
    { title: "didier finds love", snippet: "lorem ipsum" },
  ];
  // with the view egine ejs with us render and not send
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  // with the view egine ejs with us render and not send
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404
// app.use est declanché pour n'importe quel requete, ici si la requete na pas ete
// pris en charge par tout les listener get plus haut alors elle tombe dans ce handler
// qui renvoi un 404, donc un 404 ce place toujours en bas
app.use((req, res) => {
  // status piur set la status la requete a 404
  // res.status(404).sendFile("./views/404.html", { root: __dirname });

  res.status(404).render("404", { title: "404" });
});
