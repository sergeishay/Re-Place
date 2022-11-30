import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import utils from "../utils/utils";

function Book(props) {
  const bookDeleted = props.rerender;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const DeleteBook = async () => {
    await utils.deleteBook(props.book._id);
    bookDeleted(bookDeleted);
    navigate("/");
  };

  const EditBook = async () => {
    dispatch({ type: "EditBook", payload: props.book });
    navigate("/EditBook");
  };

  return (
    <div>
      <div style={{ width: "fit", height: "fit", border: "solid black 4px" }}>
        <h3>{props.book.Name}</h3>
       
        <div>
          <img
            style={{ width: "150px", height: "200px", margin: "10px" }}
            src={props.book.Image_URL}
            // alt="Book Cover"
          />
        </div>

        <input type="button" value="Edit" className="btn" onClick={EditBook} />

        <input
          type="button"
          value="Delete"
          className="btn"
          onClick={DeleteBook}
        />
      </div>
      <br />
    </div>
  );
}

export default Book;
