import { Entity } from "../entity";
import { DefaultRepository } from "./default.repository";
import { SearchParams } from "./search-params";
import { SearchResult } from "./search-result";

export interface SearchRepository<
    E extends Entity,
    F = string,
    SearchInput = SearchParams,
    SearchOutput = SearchResult<E, F>,
> extends DefaultRepository<E> {
    sortableFields: string[];
    search(props: SearchInput): Promise<SearchOutput>;
}
