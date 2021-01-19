import { Filters } from '@/src/interfaces/Filters';

import getObjectKeys from '@/src/lib/getObjectKeys';

export default function setFiltersQueryParams(baseURL: URL, filters: Filters) {
  getObjectKeys(filters).forEach((filter) => {
    const filterValue = filters[filter];

    if (!filterValue) return;

    baseURL.searchParams.set(String(filter).toLowerCase(), String(filterValue));
  });
}
