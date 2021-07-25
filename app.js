const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { render } = require("ejs");

// express app
const app = express();

// connect to mongodb
const dbURI = "mongodb://localhost:27017/tuto_node_tnn";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");

    // we only listen when the connection to the db is done
    // listen for request (return an instance of the server)
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// register view engine
// par default express va chercher nos vue dans le dossier views
app.set("view engine", "ejs");
// si l'on souhaite changer le dossier par default run la cmd suivante
// app.set("views", 'myViews')

// middleware

// app.use((req, res, next) => {
//   console.log("new request made");
//   console.log("host: ", req.hostname);
//   console.log("path: ", req.path);
//   console.log("method: ", req.method);
//   // next permet de continuer a explorer la pile de middleware fonction
//   // a appéler dans tout les middleware qui ne termine pas le cycle (via un send, ou un render)
//   next();
// });

// app.use((req, res, next) => {
//   console.log("in the next middleware");
//   next();
// });

// middleware and static file

app.use(express.static("public"));

// parse all the data to js object in the request object
app.use(express.urlencoded({ extended: true }));

// third party middleware

app.use(morgan("dev"));

// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "Test",
//     snippet: "test",
//     body: "a test blog",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => console.log(err));
// });

// app.get("/all-blogs", (req, res) => {
//   // find get all the document
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => console.log(err));
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("60fc8ec72333dd8911a5df21")
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// app.get listen for get request take the url in parametere and the callback function
app.get("/", (req, res) => {
  // res.send automatically determine the type of content that we gonna send so
  // we don't need to specify the Content-Type in the header
  // res.send also automatically handle de response code

  // sendFile allow us the send html file to the client
  // with an absolute path
  // ici les deux chemin son concateé pour formé un chemin absolu
  // on obtient le chemin de notre root en appelant l'objet gloabl __dirname
  // qui est concaténé par la methode sendFile a notre chemin relatif pour former
  // un chemin absolue
  // res.sendFile("./views/index.html", { root: __dirname });

  // const blogs = [
  //   { title: "Yoshi finds eggs", snippet: "lorem ipsum" },
  //   { title: "Yoshi finds french fries", snippet: "lorem ipsum" },
  //   { title: "didier finds love", snippet: "lorem ipsum" },
  // ];
  // // with the view egine ejs with us render and not send
  // res.render("index", { title: "Home", blogs });

  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  // with the view egine ejs with us render and not send
  res.render("about", { title: "About" });
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  // req.body is parse by the urlencoded middleware
  console.log("the recive request is :", req.body);
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      // we redirect the user when the blog is added to the database
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  console.log("hello world");
  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Blog Details", blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      // sending a json response to the client with the redirection link
      // because here the front generate an ajax request, in this case its not
      // possible to directly handle de redirection in the back, so to do that
      // we send to the front end, the redirection link in the response
      // so the front end handle the response by redirecting the the specified link
      res.json({
        redirect: "/blogs",
      });
    })
    .catch((err) => console.log(err));
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
