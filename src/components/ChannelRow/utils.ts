import { MAX_PREVIEW_LENGTH } from './constants';

export const getHiddenText = (text: string) => {
  let maxPreviewLength = MAX_PREVIEW_LENGTH;
  const isEndedWithSpace = text[maxPreviewLength - 1] === ' ';
  maxPreviewLength = isEndedWithSpace ? maxPreviewLength - 1 : maxPreviewLength;

  return text.slice(maxPreviewLength);
};
