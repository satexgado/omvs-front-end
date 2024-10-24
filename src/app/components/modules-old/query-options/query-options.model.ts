import { Filter } from './filter.model';
import { Sort } from './sort.model';


export class filterGrp {
    'or': boolean;
    'filters': Filter[];
}

export class QueryOptions  {
    filter_groups: filterGrp[];
    includes: string[];
    paginate: number;
    page: number;
    sort: Sort[];
    constructor(filters?: filterGrp[],
                includes?: string[],
                paginate?: number,
                page?: number,
                sort?: Sort[]) {
            this.filter_groups = filters;
            this.includes = includes;
            this.paginate = paginate;
            this.sort = sort;
            this.page = page;
    }

    setSort(sort: Sort[]) {
        this.sort  = sort;
        return this;
    }
}

export const DefaultQueryOptionWithSeachString = new QueryOptions(
    [
        {or: true, filters:[new Filter('searchString', false, 'ct')]},                
    ],
    [],
    8,
    1,
    [new Sort('updated_at','DESC')]
);

export const DefaultQueryOptionWithIns = new QueryOptions(
    [
        {or: false, filters:[new Filter('isIns', true, 'eq')]},
    ],
    [],
    8,
    1,
    [new Sort('updated_at','DESC')]
);

export const DefaultQueryOptionWithInsAndSeachString = new QueryOptions(
    [
        {or: false, filters:[new Filter('isIns', true, 'eq')]},
        {or: true, filters:[new Filter('searchString', false, 'ct')]},                
    ],
    [],
    8,
    1,
    [new Sort('updated_at','DESC')]
);