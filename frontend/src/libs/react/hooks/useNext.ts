import {useEffect, useRef} from "react";


export function useNext<T>(value: T) {
  const valueRef = useRef(value);
  const resolvesRef = useRef([] as any[]);
  useEffect(() => {
    if (valueRef.current !== value) {
      for (const resolve of resolvesRef.current) {
        resolve();
      }
      resolvesRef.current = [];
      valueRef.current = value;
    }
  }, [value]);
  return () => new Promise<void>(resolve => {
    resolvesRef.current.push(resolve);
  });
}
