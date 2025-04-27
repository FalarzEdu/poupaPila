export function convert(value: number) {
  // value.toString().
  // return value.toFixed(2).replace(".", ",");
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
