import React, { useEffect, useState } from 'react';
const Typewriter = ({ text, delay, setIsTypewriterDone, contentType, setIsDraftPrev }) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text?.length) {
        setDisplayText(text?.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypewriterDone(false);
        if (contentType === 'compose') {
          setIsDraftPrev(false);
        }
        clearInterval(interval);
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);
  return (
    <>
      {contentType === 'chat' ? (
        <span className="text-darkBlue text-[14px]">{displayText}</span>
      ) : (
        <textarea
          style={{ resize: 'none' }}
          id="draftPreview"
          name="draftPreview"
          rows="22"
          value={displayText}
          // placeholder="Lorem ipsum dolor sit amet consectetur."
          className="text-[14px] border-gray block h-[306px] w-full rounded-md border p-1.5"
        />
      )}
    </>
  );
};
export default Typewriter;
