import { CircularProgress } from "@mui/material";
import React, { useContext, useState } from "react";
import { getMoreBooks } from "../../apiCalls";
import { BookList } from "../../components/BookList/BookList";
import { BookContext } from "../../context/BookContext/BookContext";

interface Props {
  author: string;
  title: string;
}

export const Home: React.FC<Props> = ({ author, title }): JSX.Element => {
  const { state, dispatch } = useContext(BookContext);
  const [fetching, setFetching] = useState<boolean>(false);

  const moreBooks = async () => {
    setFetching(true);
    await getMoreBooks(dispatch);
    setFetching(false);
  };

  return (
    <div className="list">
      <h1 className="title">Books</h1>
      {state.isFetching ? (
        <CircularProgress />
      ) : (
        <>
          <BookList
            books={state.books}
            favourite={false}
            author={author}
            title={title}
          />
          {fetching ? (
            <CircularProgress />
          ) : (
            <button className="button" onClick={moreBooks}>
              More
            </button>
          )}
        </>
      )}
    </div>
  );
};
