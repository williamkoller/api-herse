export const formattedDate = (newDate: Date): string => {
  const date = new Date(newDate);
  const day = date.getDate().toString();
  const month = (new Date(newDate).getMonth() + 1).toString();
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const seconds = date.getSeconds().toString();

  const fullYear =
    day +
    '/' +
    month +
    '/' +
    year +
    ' ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds;
  return fullYear;
};
