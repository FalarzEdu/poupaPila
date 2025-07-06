export function convert(value: number){
  if (!value) return "0,00"
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function toDecimal(strValue: string): number {
  return Number(strValue
    .replace("R$ ", "")
    .replace(".", "")
    .replace(",", "."));
}
