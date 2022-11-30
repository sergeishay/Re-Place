import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import utils from "../utils/utils";

const EditBook = () => {
  const navigate = useNavigate();

  const storeData = useSelector((state) => state);
  const dispatch = useDispatch();

  const [book, setBook] = useState([{Name : "", Image_URL: "" }]);
  const [bookNameId, setBookNameId] = useState([{_id : "", Name: "" }]);

  useEffect(() => {
    const start = () => {
    setBook({
      Name: storeData.book[0].Name,
      Image_URL: storeData.book[0].Image_URL,
    });
    setBookNameId({
      _id: storeData.book[0]._id,
      Name: storeData.book[0].Name,
    });
  }
  start()
  }, []);

  const updateBook = async () => {
    let obj = {
      Name: book.Name,
      Image_URL: book.Image_URL,
    };

    await utils.editBook(bookNameId._id, obj);
    dispatch({ type: "ClearBook" });
    navigate("/");
  };

  function cancel() {
    dispatch({ type: "ClearBook" });
    navigate("/");
  }

  return (
    <div>
      <h3>Edit Book: {bookNameId.Name}</h3>
      Name:{" "}
      <input
        type="text"
        value={book.Name || ""}
        onChange={(e) => setBook({ ...book, Name: e.target.value || "" })}
        name="Name"
        className="title_name"
      />
      <br />
      Image URL:{" "}
      <input
        type="text"
        value={book.Image_URL || ""}
        onChange={(e) => setBook({ ...book, Image_URL: e.target.value || "" })}
        name="Image_URL"
        className="title_Image_URL"
      />
      <br />
      <br />
      <input
        type="button"
        value="Update"
        className="btn"
        onClick={updateBook}
      />
      <input type="button" value="Cancel" className="btn" onClick={cancel} />
    </div>
  );
};

export default EditBook;
