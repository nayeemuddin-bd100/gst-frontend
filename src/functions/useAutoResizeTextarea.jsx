import { useEffect, useCallback, useRef } from 'react';

export function useAutoResizeTextarea() {
  const ref = useRef(null);

  const resize = useCallback(() => {
    const el = ref.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }, []);

  // Resize on mount
  useEffect(() => {
    resize();
  }, [resize]);

  return { ref, onInput: resize };
}
