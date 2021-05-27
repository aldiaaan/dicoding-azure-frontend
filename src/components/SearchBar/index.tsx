// @ts-nocheck
import React from "react";

import { SearchInput } from "./elements";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const onSubmit = ({ query }) => {
    history.push(`/search?query=${query}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SearchInput ref={register} name="query" />
    </form>
  );
};

export default SearchBar;
