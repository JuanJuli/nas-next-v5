import { useState, useEffect, useRef, useCallback } from "react";

interface AsyncValidationResult {
  isValidating: boolean;
  isAvailable: boolean | null;
  error: string | null;
}

export function useAsyncValidator(
  value: string,
  checkFn: (value: string) => Promise<boolean>,
  delay: number = 1500,
  minLength: number = 1,
  label: string = "Field"
): AsyncValidationResult & { validate: () => void } {
  const [isValidating, setIsValidating] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const validate = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (abortRef.current) {
      abortRef.current.abort();
    }

    if (!value || value.length < minLength) {
      setIsValidating(false);
      setIsAvailable(null);
      setError(null);
      return;
    }

    setIsValidating(true);
    setIsAvailable(null);
    setError(null);

    const controller = new AbortController();
    abortRef.current = controller;

    timerRef.current = setTimeout(async () => {
      if (controller.signal.aborted) return;
      try {
        const available = await checkFn(value);
        if (!controller.signal.aborted) {
          setIsAvailable(available);
          setIsValidating(false);
          if (!available) {
            setError(`${label} already in use`);
          } else {
            setError(null);
          }
        }
      } catch {
        if (!controller.signal.aborted) {
          setIsValidating(false);
          setIsAvailable(null);
          setError(null);
        }
      }
    }, delay);
  }, [value, checkFn, delay, minLength, label]);

  useEffect(() => {
    validate();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [validate]);

  return { isValidating, isAvailable, error, validate };
}
