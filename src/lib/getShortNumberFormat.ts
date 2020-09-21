const MILLION = 1000000;
const THOUSAND = 1000;

function getShortNumberFormat(number: number): number | string {
  if (!number || number < 0) {
    return 0;
  }

  if (number >= MILLION) {
    return (number / MILLION).toFixed(1) + 'm';
  }

  if (number >= THOUSAND) {
    return (number / THOUSAND).toFixed(1) + 'k';
  }

  return String(number);
}

export default getShortNumberFormat;
