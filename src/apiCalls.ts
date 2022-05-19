import axios from "axios";
import { ActionType } from "./context/BookContext/BookReducer";
import { IBook } from "./interfaces/book_interface";

let page: number = 2;

const createBook = (data: any): IBook => {
  const book: IBook = {
    id: data.id,
    title: data.title,
    author: data.agents[0].person,
    image: getImageUrl(data.resources),
    text: getBookPageUrl(data.resources),
    favourite: false,
  };

  return book;
};

const createBooks = (results: any): IBook[] => {
  const books: IBook[] = [];
  for (const result of results) {
    const book = createBook(result);
    books.push(book);
  }

  return books;
};

export const fetchBooks = async (dispatch: Function) => {
  dispatch({ type: ActionType.START });
  try {
    const response = await axios.get(
      "https://gnikdroy.pythonanywhere.com/api/book/"
    );

    const books: IBook[] = createBooks(response.data.results);

    dispatch({ type: ActionType.SUCCESS, payload: books });
  } catch (err) {
    dispatch({ type: ActionType.FAILURE, payload: err });
  }
};

export const getMoreBooks = async (dispatch: Function) => {
  try {
    const response = await axios.get(
      "https://gnikdroy.pythonanywhere.com/api/book/?page=" + page
    );

    const books: IBook[] = createBooks(response.data.results);

    dispatch({ type: ActionType.ADD, payload: books });
    page += 1;
  } catch (err) {
    dispatch({ type: ActionType.FAILURE, payload: err });
  }
};

export const searchBooks = async (
  data: { [x: string]: string },
  dispatch: Function
) => {
  try {
    const response = await axios.get(
      "https://gnikdroy.pythonanywhere.com/api/book/?title_contains=" +
        data.titleContains +
        "&type=" +
        data.type +
        "&has_bookshelf=" +
        data.bookshelvesName +
        "&agent_name_contains=" +
        data.agentNameContains
    );

    const books: IBook[] = createBooks(response.data.results);

    dispatch({ type: ActionType.SEARCH, payload: books });
  } catch (err) {
    dispatch({ type: ActionType.FAILURE, payload: err });
  }
};

type resource = {
  id: number;
  uri: string;
  type: string;
};

const getImageUrl = (resources: resource[]): string => {
  for (const resource of resources) {
    if (resource.uri.includes("medium.jpg")) return resource.uri;
  }
  return "";
};

const getBookPageUrl = (resources: resource[]): string => {
  for (const resource of resources) {
    if (resource.uri.includes("h.htm")) return resource.uri;
  }
  return "";
};

export const filtrBook = (
  book: IBook,
  author: string,
  title: string
): boolean => {
  if (author === "" && title === "") return true;
  if (author === "" && title !== "") return book.title.includes(title);
  if (author !== "" && title === "") return book.author.includes(author);
  if (author !== "" && title !== "")
    return book.author.includes(author) && book.title.includes(title);
  return false;
};
