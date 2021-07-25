const express = require("express");
const Blog = require("../models/blog");

// the router is like a sub instance of the app, the router need to be
// inside of an app
const router = express.Router();

router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res) => {
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

router.get("/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

router.get("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

module.exports = router;
