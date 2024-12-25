import { useEffect, useRef } from "react";

export function useIntersection(
  callback: () => void,
  options: IntersectionObserverInit = {},
) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const currentElementRef = useRef<Element | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        callbackRef.current();
      }
    }, options);

    // If there's an element already referenced, observe it
    if (currentElementRef.current) {
      observerRef.current.observe(currentElementRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [options]);

  return (element: Element | null) => {
    // Cleanup previous element
    if (currentElementRef.current && observerRef.current) {
      observerRef.current.unobserve(currentElementRef.current);
    }

    // Update current element reference
    currentElementRef.current = element;

    // Observe new element
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  };
}
