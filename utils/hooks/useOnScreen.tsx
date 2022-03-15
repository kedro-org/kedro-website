import { useState, useEffect, MutableRefObject } from 'react';

/**
 *
 * Check if an element is in on the screen.
 * Source: https://usehooks.com/useOnScreen/
 */
export default function useOnScreen<T extends Element>(
  ref: MutableRefObject<T>,
  rootMargin: string = '0px'
): boolean {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.unobserve(currentRef);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures that effect is only run on mount and unmount.

  return isIntersecting;
}
