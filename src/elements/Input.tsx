import { useContext } from "react";
import { InputContext } from "../App";

const Input = () => {
  const inputContext = useContext(InputContext);

  return (
    <input
      className="city-input"
      type={inputContext.inputType}
      value={inputContext.inputValue}
      placeholder={inputContext.inputPlaceholder}
      onChange={inputContext.onChangeHandler}
      onKeyDown={inputContext.onKeyDown}
      required
    />
  );
};

export default Input;
