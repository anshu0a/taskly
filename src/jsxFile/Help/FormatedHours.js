export default function spendToHoursDecimal(spend) {
  const totalMinutes = spend / 0.0167;
  const decimalHours = totalMinutes / 60;
  return decimalHours < 0.05 ? 0.1 : Math.round(decimalHours * 10) / 10;
}
