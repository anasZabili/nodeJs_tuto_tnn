const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  console.log("hello world");
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { title: "Blog Details", blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create a new blog" });
};

const blog_create_post = (req, res) => {
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
};

const blog_delete = (req, res) => {
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
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
