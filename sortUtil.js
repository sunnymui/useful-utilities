// low to high / old to new
export const ascendingSort = (a, b) => a - b;

// high to low / new to old
export const descendingSort = (a, b) => b - a;

export const sortUsingSortOrderMap = (orderMap, items, sorter) => {
  // sort the array of items based on the sort value for the corresponding
  // item in the sort order map using the sorter function, which should follow a format like:
  /*
    {
      TOTAL: 8,
      D54P: 7,
      D53P: 6,
      D53G: 5,
      D52G: 4,
      N104: 3,
      D79: 2,
      B389: 1,
      N84: 0,
    }
  */
  const bySortOrderMap = (a, b) => {
    const aSortValue = orderMap[a] ?? 0;
    const bSortValue = orderMap[b] ?? 0;
    return sorter(aSortValue, bSortValue);
  };

  return items.sort(bySortOrderMap);
};
