import { SearchResult } from "src/@kernel/domain";
import { PaginationOutputMapper } from "../pagination-output.mapper";

describe("PaginationOutputMapper unit tests", () => {
    it("should be able to convert a SearchResult into output object", () => {
        const result = new SearchResult({
            items: ["item 1"] as any,
            total: 1,
            currentPage: 1,
            perPage: 1,
            sort: "name",
            sortDir: "ASC",
            filter: "field_to_be_filtered",
        });
        const output = PaginationOutputMapper.toOutput(result.items, result);
        expect(output).toStrictEqual({
            items: ["item 1"],
            total: 1,
            currentPage: 1,
            lastPage: 1,
            perPage: 1,
        });
    });
});
