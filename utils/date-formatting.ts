export const dateFormatting = (date: string) => {
  return new Date(date).toLocaleDateString('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
