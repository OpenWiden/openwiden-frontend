import { ProgrammingLanguage } from '@/src/interfaces/ProgrammingLanguage';
import { Filter, Filters } from '@/src/interfaces/Filters';

import getObjectKeys from '@/src/lib/getObjectKeys';

export default function setFiltersQueryParams(baseURL: URL, filters: Filters) {
  getObjectKeys(filters).forEach((filter) => {
    let filterValue = filters[filter];

    if (!filterValue) return;

    if (filter === Filter.PROGRAMMING_LANGUAGE) {
      filterValue = (filterValue as ProgrammingLanguage).id;
    }

    baseURL.searchParams.set(String(filter).toLowerCase(), String(filterValue));
  });
}
