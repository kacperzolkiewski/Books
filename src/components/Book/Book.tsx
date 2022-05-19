import React, { useContext } from "react";
import { IBook } from "../../interfaces/book_interface";
import StarIcon from "@mui/icons-material/Star";
import "./book.css";
import { BookContext } from "../../context/BookContext/BookContext";
import { ActionType } from "../../context/BookContext/BookReducer";

type BookProps = {
  book: IBook;
};

export const Book: React.FC<BookProps> = ({ book }): JSX.Element => {
  const { dispatch } = useContext(BookContext);

  const markBookAsFavourite = () => {
    book.favourite
      ? dispatch({ type: ActionType.UNMARK, payload: book })
      : dispatch({ type: ActionType.MARK, payload: book });
  };

  return (
    <div className="book">
      {book.favourite ? (
        <StarIcon
          onClick={markBookAsFavourite}
          sx={{
            color: "rgb(6, 101, 211)",
            marginBottom: "5px",
            cursor: "pointer",
          }}
        />
      ) : (
        <StarIcon
          onClick={markBookAsFavourite}
          sx={{
            marginBottom: "5px",
            cursor: "pointer",
          }}
        />
      )}

      <img src={book.image} alt={book.title + " image"} className="bookImg" />
      <span className="bookInfo">Title: {book.title}</span>
      <span className="bookInfo">Author: {book.author}</span>
      <a target="_blank" rel="noreferrer" href={book.text} className="bookRead">
        Read
      </a>
    </div>
  );
};
