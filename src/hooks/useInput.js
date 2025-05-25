import { useState } from "react";

export function useInput(defaultValue, validationFn) {
  const [inputState, setInputState] = useState({
    value: defaultValue,
    didBlur: false,
    wasValidOnBlur: true,
  });

  function handleInputChange(e) {
    setInputState({
      value: e.target.value,
      didBlur: false,
      wasValidOnBlur: true, // assume valid until next blur
    });
  }

  function handleInputBlur() {
    setInputState((prev) => ({
      ...prev,
      didBlur: true,
      wasValidOnBlur: validationFn(prev.value),
    }));
  }

  const hasError = inputState.didBlur && !inputState.wasValidOnBlur;

  return {
    value: inputState.value,
    hasError,
    handleInputChange,
    handleInputBlur,
    setInputState,
  };
}
