export function convert(value: number){
  if (!value) return "0,00"
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
