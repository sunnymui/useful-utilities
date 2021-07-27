// low to high / old to new
export const ascendingSort = (a, b) => a - b;

// high to low / new to old
export const descendingSort = (a, b) => b - a;

// sort array of objs using a key value with the sorter fn
export const sortObjsByValue = (key, items, sorter) => {
  return [...items].sort((a, b) => {
    const aValue = a?.[key];
    const bValue = b?.[key];

    return sorter(aValue, bValue);
  });
};

export const sortUsingSortOrderMap = (orderMap, items, sorter) => {
  // sort the array of items based on the sort value for the corresponding
  // item in the sort order map using the sorter function, which should follow a format like:
  /*
    {
      John: 8,
      Adam: 7,
      Siri: 6,
      Dos: 5,
      Mike: 4,
      Nike: 3,
      Darren: 2,
      Bert: 1,
      Neelix: 0,
    }
  */
  const bySortOrderMap = (a, b) => {
    const aSortValue = orderMap[a] ?? 0;
    const bSortValue = orderMap[b] ?? 0;
    return sorter(aSortValue, bSortValue);
  };

  return items.sort(bySortOrderMap);
};
