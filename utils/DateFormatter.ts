export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
