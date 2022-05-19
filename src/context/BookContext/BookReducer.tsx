import { IBook } from "../../interfaces/book_interface";
import { IState } from "./BookContext";

export enum ActionType {
  START = "FETCHING_START",
  SUCCESS = "FETCHING_SUCCESS",
  FAILURE = "FETCHING_FAILURE",
  ADD = "ADD_BOOKS",
  MARK = "MARK_BOOK_AS_FAVOURITE",
  UNMARK = "UNMARK_BOOK_AS_FAVOURITE",
  SEARCH = "SEARCH_BOOKS",
}

type Action =
  | {
      type: ActionType.SUCCESS | ActionType.ADD | ActionType.SEARCH;
      payload: IBook[];
    }
  | { type: ActionType.FAILURE; payload: Error }
  | { type: ActionType.START }
  | { type: ActionType.MARK | ActionType.UNMARK; payload: IBook };

export const BookReducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case ActionType.START:
      return {
        ...state,
        isFetching: true,
      };
    case ActionType.SUCCESS:
      return {
        ...state,
        books: action.payload,
        isFetching: false,
      };
    case ActionType.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case ActionType.ADD:
      return {
        ...state,
        books: [...state.books, ...action.payload],
      };
    case ActionType.MARK:
      if (!checkIfArrayContainBook(action.payload, state.books)) {
        state.books.push(action.payload);
      }
      state.books.map((book) => {
        if (book.id === action.payload.id) book.favourite = true;
      });
      return {
        ...state,
        searchBooks: state.searchBooks.filter(
          (book) => book.id !== action.payload.id
        ),
      };
    case ActionType.UNMARK:
      state.books.map((book) => {
        if (book.id === action.payload.id) book.favourite = false;
      });
      return {
        ...state,
      };
    case ActionType.SEARCH:
      return {
        ...state,
        searchBooks: action.payload,
      };
    default:
      return state;
  }
};

const checkIfArrayContainBook = (book: IBook, books: IBook[]) => {
  for (const b of books) {
    if (b.id === book.id) return true;
  }
  return false;
};
