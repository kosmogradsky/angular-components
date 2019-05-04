export const separateDigits = (num = 0, decimalCount = 1) => {
  const roundNum = Math.round(num * 10 ** decimalCount) / 10 ** decimalCount;
  const [integer, decimal] = roundNum.toString().split('.');
  const integerFormatted = integer.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  let decimalFormatted = '';

  if (decimalCount) {
    decimalFormatted = decimal ? decimal.slice(0, decimalCount) : '';
    decimalFormatted = `,${decimalFormatted}${'0'.repeat(decimalCount - decimalFormatted.length)}`;
  }

  return integerFormatted + decimalFormatted;
};
