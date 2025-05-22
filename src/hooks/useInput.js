import { useState } from "react";

export function useInput(defaultValue, validationFn) {
  const [entredValue, setEntredValue] = useState({
    value: defaultValue,
    didEdit: false,
  });

  const valueIsValid = validationFn(entredValue.value);
  // const [didEdit, setDidEdit] = useState(false);
  function handleInputChange(e) {
    setEntredValue({
      value: e.target.value,
      didEdit: false,
    });
  }
  function handleInputBlur() {
    setEntredValue((prevEntredValue) => ({
      ...prevEntredValue,
      didEdit: true,
    }));
  }

  return {
    value: entredValue.value,
    hasError: entredValue.didEdit && !valueIsValid,
    handleInputBlur,
    handleInputChange,
  };
}
