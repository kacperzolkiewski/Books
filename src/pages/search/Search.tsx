import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormGroup } from "../../components/FormGroup/FormGroup";
import { searchBooks } from "../../apiCalls";
import { BookContext } from "../../context/BookContext/BookContext";
import { BookList } from "../../components/BookList/BookList";
import { CircularProgress } from "@mui/material";

const schema = yup
  .object()
  .shape({
    type: yup.string().default(""),
    titleContains: yup.string().default(""),
    agentNameContains: yup.string().default(""),
    bookshelvesName: yup.string().default(""),
  })
  .required();

export const Search: React.FC<{ author: string; title: string }> = ({
  author,
  title,
}) => {
  const { state, dispatch } = useContext(BookContext);
  const [fetching, setFetching] = useState<boolean>(false);
  const { handleSubmit, register } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data: { [x: string]: string }) => {
    setFetching(true);
    await searchBooks(data, dispatch);
    setFetching(false);
  };

  return (
    <div className="list">
      <h1 className="title">Search Book</h1>
      <form onSubmit={handleSubmit(submitForm)} className="searchForm">
        <div className="formDiv">
          <FormGroup
            name="type"
            label="Type"
            register={register}
            placeholder="type..."
          />
          <FormGroup
            name="titleContains"
            label="Title Contains"
            register={register}
            placeholder="title..."
          />
        </div>
        <div className="formDiv">
          <FormGroup
            name="agentNameContains"
            label="Agent Name Contains"
            register={register}
            placeholder="Agent..."
          />
          <FormGroup
            name="bookshelvesName"
            label="Bookshelves Name"
            register={register}
            placeholder="Bookshelf..."
          />
        </div>
        <button className="button searchBtn" type="submit">
          Search
        </button>
      </form>
      {fetching ? (
        <CircularProgress />
      ) : state.searchBooks.length !== 0 ? (
        <BookList
          books={state.searchBooks}
          favourite={false}
          author={author}
          title={title}
        />
      ) : (
        <h1>No Results</h1>
      )}
    </div>
  );
};
