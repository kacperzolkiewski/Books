import React, { useContext } from "react";
import { BookList } from "../../components/BookList/BookList";
import { BookContext } from "../../context/BookContext/BookContext";

interface Props {
  author: string;
  title: string;
}

export const Favourite: React.FC<Props> = ({ author, title }) => {
  const { state } = useContext(BookContext);
  return (
    <div className="list">
      <h1 className="title">Favourite Books</h1>
      <BookList
        books={state.books}
        favourite={true}
        author={author}
        title={title}
      />
    </div>
  );
};
