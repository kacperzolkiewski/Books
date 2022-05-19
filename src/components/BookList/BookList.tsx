import React from "react";
import { filtrBook } from "../../apiCalls";
import { IBook } from "../../interfaces/book_interface";
import { Book } from "../Book/Book";

interface Props {
  favourite: boolean;
  author: string;
  title: string;
  books: IBook[];
}

export const BookList: React.FC<Props> = ({
  favourite,
  author,
  title,
  books,
}): JSX.Element => {
  return favourite ? (
    <div className="bookList">
      {books.map((book, index) => {
        if (book.favourite && filtrBook(book, author, title))
          return <Book key={index} book={book} />;
      })}
    </div>
  ) : (
    <div className="bookList">
      {books.map((book, index) => {
        if (filtrBook(book, author, title))
          return <Book key={index} book={book} />;
      })}
    </div>
  );
};
