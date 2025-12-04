// formateink(999)       // "999"
// formateink(1000)      // "1k"
// formateink(56253)     // "56.25k"
// formateink(1500000)   // "1.5m"
// formateink(2500000000)// "2.5b"

export default function formateink(num) {
  if (num < 1000) return String(Math.round(num));

  const units = ["", "k", "m", "b", "t"];
  let i = 0;

  while (num >= 1000 && i < units.length - 1) {
    num /= 1000;
    i++;
  }

  return num.toFixed(2).replace(/\.00$/, '') + units[i];
}
