export const replaceWordsInBrackets = (inputString, replacements) => {
  let currentIndex = 0;

  const resultString = inputString.replace(/\[.*?\]/g, (match) => {
    const replacement = replacements[currentIndex];
    currentIndex++;
    return `[${replacement}]`;
  });

  return resultString.replaceAll('[', '').replaceAll(']', '');
};
