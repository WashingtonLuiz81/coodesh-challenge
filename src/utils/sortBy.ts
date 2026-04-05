export type SortOrder = "asc" | "desc";

export function sortBy<T>(
  data: T[],
  key: keyof T,
  order: SortOrder = "asc"
): T[] {
  const sorted = [...data].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue === bValue) return 0;

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    if (aValue > bValue) return 1;
    if (aValue < bValue) return -1;

    return 0;
  });

  return order === "asc" ? sorted : sorted.reverse();
}