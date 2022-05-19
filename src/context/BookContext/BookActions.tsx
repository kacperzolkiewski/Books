import { IBook } from "../../interfaces/book_interface";
import { ActionType } from "./BookReducer";

export const FetchingStart = () => ({
  type: ActionType.START,
});

export const FetchingSuccess = (books: IBook[]) => ({
  type: ActionType.SUCCESS,
  payload: books,
});

export const FetchingFailure = (error: Error) => ({
  type: ActionType.FAILURE,
  payload: error,
});

export const AddBooks = (books: IBook[]) => ({
  type: ActionType.ADD,
  payload: books,
});

export const SearchBooks = (books: IBook[]) => ({
  type: ActionType.SEARCH,
  payload: books,
});

export const MarkBookAsFavourite = (book: IBook) => ({
  type: ActionType.MARK,
  payload: book,
});

export const UnMarkBookAsFavourite = (book: IBook) => ({
  type: ActionType.UNMARK,
  payload: book,
});
