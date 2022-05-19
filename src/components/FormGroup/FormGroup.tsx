import React from "react";

interface Props {
  name: string;
  label: string;
  placeholder: string;
  register: Function;
}

export const FormGroup: React.FC<Props> = (props) => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <br />
      <input
        placeholder={props.placeholder}
        {...props.register(props.name)}
        className="input"
      />
    </div>
  );
};
