const express = require("express");
const router = express.Router();
const booksBL = require("../models/booksBL");
const multer = require('multer');
const {v4 : uuidv4} =require('uuid')
const path = require("path")
const Book = require("../models/booksSchema");


const storage = multer.diskStorage({
  limits: 500000,
  destination: function (req , file, cb) {
    cb(null , "images")
  },
  filename: function (req, file, cb){
    cb(null , uuidv4() + '' + Date.now() + path.extname(file.originalname))
  }
})

const fileFilter = (req , file , cb ) => {
  const allowedFileTypes = [  'image/png' , 'image/jpeg', 'image/jpg']
  if(allowedFileTypes.includes(file.mimetype)){
    cb(null, true)
  }else{
    cb(null, false)
  }
}

let upload = multer({storage ,fileFilter})

router.get("/", async function (req, resp) {
  let data = await booksBL.getAllBooks();
  return resp.json(data);
});

router.get("/:id", async function (req, resp) {
  let id = req.params.id;
  let data = await booksBL.getBook(id);
  return resp.json(data);
});

router.post("/",upload.single('image') , async function (req, res) {
  const obj  = {
    Name:req.body.name,
    Image_URL: req.file.filename
  }
  let bookid = await booksBL.addBook(obj);
  console.log (bookid)
  return res.json("Created with id: " + bookid);
});

router.put("/:id", async function (req, resp) {
  let obj = req.body;
  let id = req.params.id;
  await booksBL.updateBook(id, obj);
  return resp.json("Updated!");
});

router.delete("/:id", async function (req, resp) {
  let id = req.params.id;
  await booksBL.deleteBook(id);
  return resp.json("Deleted!");
});

module.exports = router;