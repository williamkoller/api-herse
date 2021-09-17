export const formattedDate = (newDate: Date): string | null => {
  if (newDate) {
    const date = new Date(newDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (new Date(newDate).getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

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
  }

  return null;
};
