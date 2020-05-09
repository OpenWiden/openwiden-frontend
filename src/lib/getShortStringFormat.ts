function getShortStringFormat(string: string, maxWords: number): string {
  const words = string.split(/\s/);

  if (words.length <= maxWords) {
    return string;
  }

  return words.slice(0, maxWords).join(' ') + '...';
}

export default getShortStringFormat;
