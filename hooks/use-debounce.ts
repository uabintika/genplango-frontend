import { useRef } from "react";

export default function useDebounce(cb: (...args: any) => void, delay: number) {
  const timeoutId = useRef<string | number | NodeJS.Timeout | undefined>(
    undefined
  );

  return (...args: any) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => cb(...args), delay);
  };
}
