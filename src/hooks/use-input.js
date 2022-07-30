import { useState } from "react";

const useInput = (validationConfig) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValueValid = validationConfig(value);

  const hasError = !isValueValid && isTouched;

  const onChangeHandler = (event) => setValue(event.target.value);

  const onBlurHandler = () => setIsTouched(true);

  const onReset = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    isValueValid,
    hasError,
    onChangeHandler,
    onBlurHandler,
    onReset,
  };
};

export default useInput;
