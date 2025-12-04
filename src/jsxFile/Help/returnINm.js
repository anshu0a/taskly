// formateink(999)       // "999"
// formateink(1000)      // "1k"
// formateink(56253)     // "56.25k"
// formateink(1500000)   // "1.5m"
// formateink(2500000000)// "2.5b"

export default function (num) {
    console.log(num)

    if (!num || isNaN(num)) return "0";

    // Round the number first to avoid floating-point errors
    num = Math.round(num * 100) / 100;

    if (num < 1000) return num.toString();

    const units = ["", "k", "m", "b", "t"];
    let i = 0;
    let value = num;

    while (value >= 1000 && i < units.length - 1) {
        value /= 1000;
        i++;
    }

    return value.toFixed(2).replace(/\.00$/, '') + units[i];
}

