import { useCallback, useState } from "react";

export const useTrigger = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const trigger = useCallback(() => setValue((v) => !v), []);
  const truly = useCallback(() => setValue(true), []);
  const falsy = useCallback(() => setValue(false), []);

  return { value, truly, falsy, trigger };
};
