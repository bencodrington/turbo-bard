import { useState } from "react";

type ReturnType = [
  boolean,
  (newValue: boolean) => void,
  () => void
];

export default function useBoolean(initialValue: boolean = false): ReturnType {
  const [value, setValue] = useState(initialValue);
  const toggleValue = () => {
    setValue(!value);
  }
  return [value, setValue, toggleValue];
}