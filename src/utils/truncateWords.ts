const WORD_PATTERN = /\s+/;

export function truncateWords(text: string, maxWords: number) {
  const words = text.trim().split(WORD_PATTERN).filter(Boolean);

  if (words.length <= maxWords) {
    return { text, isTruncated: false };
  }

  return {
    text: `${words.slice(0, maxWords).join(" ")}…`,
    isTruncated: true,
  };
}
