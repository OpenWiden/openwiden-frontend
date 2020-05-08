function getShortNumberFormat(number: number): null | string {
  const million = 1000000;
  const thousand = 1000;

  if (!number || number < 0) {
    return null;
  }

  if (number >= million) {
    return (number / million).toFixed(1) + 'm';
  }

  if (number >= thousand) {
    return (number / thousand).toFixed(1) + 'k';
  }

  return String(number);
}

export default getShortNumberFormat;
