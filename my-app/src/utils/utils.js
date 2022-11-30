import axios from "axios";

const url = "http://localhost:8000/api";

const getAllBooks = async () => {
  let resp = await axios.get(`${url}/books`);
  return resp;
};

const getBook = async (BookID) => {
  let resp = await axios.get(`${url}/books/${BookID}`);
  return resp;
};

const addBook = async (obj) => {

  let resp = await axios.post(`${url}/books`, obj).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
  return resp;
};

const editBook = async (BookID, obj) => {
  let resp = await axios.put(`${url}/books/${BookID}`, obj);
  return resp;
};

const deleteBook = async (BookID) => {
  let resp = await axios.delete(`${url}/books/${BookID}`);
  return resp;
};

export default {
  getAllBooks,
  getBook,
  addBook,
  editBook,
  deleteBook,
  };
