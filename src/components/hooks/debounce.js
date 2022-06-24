import { useState, useEffect } from "react";

function debounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timerId = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value]);

  return debounceValue;
}

export default debounce;
