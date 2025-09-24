export default function formatRelativeDate(inputDate) {
  if (!inputDate) return "";

  const date = new Date(inputDate);
  const now = new Date();

  // reset hours for accurate "day" comparison
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfInput = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // difference in milliseconds → days
  const diffMs = startOfToday - startOfInput;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return `${diffDays} days ago`;

  // fallback: show date
  return date.toLocaleDateString();
}
