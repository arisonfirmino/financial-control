export const calculateTotal = <T>(
  items: T[] | undefined,
  valueExtractor: (item: T) => number,
) => {
  if (!Array.isArray(items)) {
    return 0;
  }

  return items.reduce((total, item) => total + valueExtractor(item), 0);
};
