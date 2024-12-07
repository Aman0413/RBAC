const formatMongoDate = (mongoDate: string | Date): string => {
  const date = new Date(mongoDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export default formatMongoDate;
