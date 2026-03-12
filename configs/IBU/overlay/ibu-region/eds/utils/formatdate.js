function formatDate(dateString, { style = "short" } = {}) {
  const parsedDate = new Date(dateString);

  if (Number.isNaN(parsedDate.getTime())) return null;

  if (style === "long") {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(parsedDate);
  }

  // Default short format: MM/DD/YYYY
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const year = parsedDate.getFullYear();
  return `${month}/${day}/${year}`;
}

export default formatDate;
