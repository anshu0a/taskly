// format duration in days/hours/minutes
function formatDuration(ms) {
  if (ms <= 0) return "0 min";
  let seconds = Math.floor(ms / 1000);

  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds %= 24 * 60 * 60;

  const hours = Math.floor(seconds / (60 * 60));
  seconds %= 60 * 60;

  const minutes = Math.floor(seconds / 60);

  let parts = [];

  if (days > 0) {
    // show only days (ignore hours/minutes if day exists)
    parts.push(`${days} day${days > 1 ? "s" : ""}`);
  } else if (hours > 0) {
    parts.push(`${hours} hr${hours > 1 ? "s" : ""}`);
  } else {
    parts.push(`${minutes} min${minutes > 1 ? "s" : ""}`);
  }

  return parts.length ? parts.join(" ") : "0 min";
}

export default formatDuration;
