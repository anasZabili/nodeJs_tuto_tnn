const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// a schema describe the structure that each of our document gonna follow
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  // this object stand for optional props
  // here we set timestamps to true witch gonna automatically set
  // the updatedAt createdAt, props on our docuements
  { timestamps: true }
);

// Blog represent the model, the model is the entity which communicate with
// the database and respect the schema, it's a very convenient way to interact
// with the database
// la connection au modl ce fait  a partir du mon passé en paramatere
// ici "Blog" ce nom est automatiquement mis au pluriel ainsi ce model
// sera mis en liens avec la collection "blogs", le nom du model secris donc
// toujours au singulier
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
