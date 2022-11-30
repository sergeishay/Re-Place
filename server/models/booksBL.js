const Book = require("./booksSchema");

const getAllBooks = async () => {
  let data = await Book.find({});
  return data;
};

const getBook = async (id) => {
  let data = await Book.findById(id);
  return data;
};

const addBook = async (obj) => {
    let book = new Book({
    Name: obj.Name,
    Image_URL: obj.Image_URL,
  });
  await book.save();
  return book._id;
};

const updateBook = async (id, obj) => {
  await Book.findByIdAndUpdate(id, {
    Name: obj.Name,
    Image_URL: obj.Image_URL,
  });
};

const deleteBook = async (id) => {
  await Book.findByIdAndDelete(id);
};

module.exports = {
  getAllBooks,
  getBook,
  updateBook,
  addBook,
  deleteBook,
};
