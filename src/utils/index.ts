// eslint-disable-next-line import/prefer-default-export
export const calculateReadingTime = (text: string) => {
  const wordsPerMinute = 200; // Average reading speed
  const words = text.split(/\s+/).length; // Split by spaces and count words
  const readingTime = Math.ceil(words / wordsPerMinute); // Round up the time
  return readingTime;
};
