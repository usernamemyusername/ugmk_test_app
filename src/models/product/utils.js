export function getProductDate(dateStr) {
  if (!dateStr) {
    return null;
  }

  const splittedDate = dateStr.split("/");

  return new Date(+splittedDate[2], splittedDate[1] - 1, +splittedDate[0]);
}
