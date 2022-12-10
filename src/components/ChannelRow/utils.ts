export const getHiddenText = (text: string, maxlenght: number) => {
  const isEndedWithSpace = text[maxlenght - 1] === ' ';
  maxlenght = isEndedWithSpace ? maxlenght - 1 : maxlenght;

  return text.slice(maxlenght);
};
