import React from "react";

interface Props {
  show: boolean;
  authorChange: Function;
  titleChange: Function;
}

export const Filter: React.FC<Props> = ({
  show,
  authorChange,
  titleChange,
}) => {
  return (
    <div className="filter" style={show ? { left: "5px" } : { left: "-260px" }}>
      <label htmlFor="author" className="label">
        Author
      </label>
      <input
        type="text"
        name="author"
        className="input"
        placeholder="By author..."
        onChange={(e) => {
          authorChange(e.target.value);
        }}
      />
      <label htmlFor="title" className="label">
        Title
      </label>
      <input
        type="text"
        name="title"
        className="input"
        placeholder="By title..."
        onChange={(e) => {
          titleChange(e.target.value);
        }}
      />
    </div>
  );
};
