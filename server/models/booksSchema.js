const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  Name: String,
  Image_URL: String,
}, { versionKey: false });

module.exports = mongoose.model("books", booksSchema);
