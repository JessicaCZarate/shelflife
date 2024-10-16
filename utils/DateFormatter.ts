export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export function daysLeftUntilExpiration(expirationDate: string | null): number {
  if (!expirationDate) return 0;

  const today = new Date();
  const expiration = new Date(expirationDate);

  // Calculate the difference in milliseconds
  const differenceInMillis = expiration.getTime() - today.getTime();

  // Calculate the difference in days
  const differenceInDays = Math.ceil(differenceInMillis / (1000 * 60 * 60 * 24));

  return differenceInDays >= 0 ? differenceInDays : 0; // Return 0 if the expiration date has passed
}
