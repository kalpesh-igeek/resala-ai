import React, { useEffect, useState } from 'react';

const TypewriterEffect = ({ text, delay }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [text, currentIndex, delay]);

  return <span className="text-[#19224C] text-[14px]">{displayText}</span>;
};

export default TypewriterEffect;
