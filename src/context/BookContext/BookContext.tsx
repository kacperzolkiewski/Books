import React, { createContext, useReducer } from "react";
import { IBook } from "../../interfaces/book_interface";
import { BookReducer } from "./BookReducer";

export interface IState {
  books: IBook[];
  searchBooks: IBook[];
  isFetching: boolean;
  error: Error | null;
}

const INITIAL_STATE: IState = {
  books: [],
  searchBooks: [],
  isFetching: false,
  error: null,
};

export const BookContext = createContext<{
  state: IState;
  dispatch: Function;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

interface Props {
  children: React.ReactNode;
}

export const BookProvider = (props: Props) => {
  const [state, dispatch] = useReducer(BookReducer, INITIAL_STATE);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
};
