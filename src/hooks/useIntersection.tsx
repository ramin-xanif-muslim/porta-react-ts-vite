import { useCallback, useRef } from "react";

export function useIntersection(onIntersection: () => void) {
  const unsubscribe = useRef(() => {});

  return useCallback(
    (el: HTMLDivElement | null) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersection();
          }
        });
      });

      if (el) {
        observer.observe(el);
        unsubscribe.current = () => observer.unobserve(el);
      } else {
        unsubscribe.current();
      }
    },
    [unsubscribe],
  );
}
