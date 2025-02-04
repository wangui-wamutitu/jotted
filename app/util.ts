export function getTimeAgo(date: string | Date): string {
  const givenDate = new Date(date);
  const now = new Date();

  const diffInMs = now.getTime() - givenDate.getTime(); // Difference in milliseconds
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert to minutes
  const diffInHours = Math.floor(diffInMinutes / 60); // Convert to hours
  const diffInDays = Math.floor(diffInHours / 24); // Convert to days
  const diffInMonths = Math.floor(diffInDays / 30); // Approximate months
  const diffInYears = Math.floor(diffInDays / 365); // Approximate years

  if (diffInMinutes < 1) {
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  } else if (diffInDays < 365) {
    return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
  } else {
    return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
  }
}

export function getInitials(name: string): string {
  return name
    .split(/[\s_]+/)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}
