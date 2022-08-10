import { SearchResult } from "../search-result";

describe("SearchResult unit tests", () => {
    it("should be able to create SearchResult instance", () => {
        let result = new SearchResult({
            items: ["entity1", "entity2"] as any,
            total: 4,
            currentPage: 1,
            perPage: 2,
            sort: null,
            sortDir: null,
            filter: null,
        });

        expect(result.toJSON()).toStrictEqual({
            items: ["entity1", "entity2"] as any,
            total: 4,
            currentPage: 1,
            perPage: 2,
            lastPage: 2,
            sort: null,
            sortDir: null,
            filter: null,
        });

        result = new SearchResult({
            items: ["entity1", "entity2"] as any,
            total: 4,
            currentPage: 1,
            perPage: 2,
            sort: "name",
            sortDir: "ASC",
            filter: "test",
        });

        expect(result.toJSON()).toStrictEqual({
            items: ["entity1", "entity2"] as any,
            total: 4,
            currentPage: 1,
            perPage: 2,
            lastPage: 2,
            sort: "name",
            sortDir: "ASC",
            filter: "test",
        });
    });
    it("should set lastPage = 1 when perPage field is greater than total field", () => {
        const result = new SearchResult({
            items: [] as any,
            total: 4,
            currentPage: 1,
            perPage: 15,
            sort: "name",
            sortDir: "ASC",
            filter: "test",
        });

        expect(result.lastPage).toBe(1);
    });
    it("should set lastPage prop when total is not a multiple of perPage", () => {
        const result = new SearchResult({
            items: [] as any,
            total: 101,
            currentPage: 1,
            perPage: 20,
            sort: "name",
            sortDir: "ASC",
            filter: "test",
        });

        expect(result.lastPage).toBe(6);
    });
});
