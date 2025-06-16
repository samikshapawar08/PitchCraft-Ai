
import { useState, useEffect } from 'react';

/**
 * A custom hook that simulates a typewriter effect for a given text.
 * @param text The text to be animated.
 * @param speed The speed of typing in milliseconds. Defaults to 30ms.
 * @returns The portion of the text to be displayed at the current time.
 */
export const useTypewriter = (text: string, speed: number = 30) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText('');
    if (text) {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(prevText => prevText + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, speed);

      return () => {
        clearInterval(typingInterval);
      };
    }
  }, [text, speed]);

  return displayText;
};
