import { useContext, useState } from "react";
import { InputContext } from "../App";
import Button from "../elements/Button";
import Input from "../elements/Input";

const SearchBar = () => {
  const buttonInput = useContext(InputContext);
  return (
    <div className="search-bar">
      <Input />
      <button onClick={buttonInput.onBtnClick} className="material-icons" id="btn-search">search</button>
    </div>
  );
};

export default SearchBar;
