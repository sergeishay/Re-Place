import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import utils from "../utils/utils";

import Book from "../components/Book";

function Books() {
  const [bookDeleted, setBookDeleted] = useState(false);

  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [find, setFind] = useState(" ");

  useEffect(() => {
    const getBooks = async () => {
      let resp = await utils.getAllBooks();
      setBooks(resp.data);
    };
    getBooks();
  }, [find, bookDeleted]);

  const rerender = useCallback(() => {
    setBookDeleted( prevState => ({bookDeleted: !prevState.bookDeleted}));
  }, []);

  function findBook() {
    setBooks(books.filter((item) => item.Name.toLowerCase().startsWith(find)));
  }

  function addBook() {
    navigate("/AddBook");
  }

  return (
    <div>
      <span>
        <input
          type="button"
          value="Add Book"
          className="btn"
          onClick={addBook}
        />
      </span>

      <div>
        Find Book:{" "}
        <input
          type="text"
          placeholder="by Book Name"
          onChange={(e) => setFind(e.target.value.toLowerCase())}
          name="find"
          className="find"
        />
        <input type="button" value="Find" className="btn" onClick={findBook} />
        {books.map((item) => {
          return <Book book={item} key={item._id} rerender={rerender} />;
        })}
      </div>
    </div>
  );
}
export default Books;
