import { SearchParams } from "../search-params";

describe("SearchParams unit tests", () => {
    describe("page property", () => {
        it("should be able to set default value to 1", () => {
            const params = new SearchParams();
            expect(params.page).toBe(1);
        });
        it.each([
            { page: null, expected: 1 },
            { page: undefined, expected: 1 },
            { page: "", expected: 1 },
            { page: "fake", expected: 1 },
            { page: 0, expected: 1 },
            { page: -1, expected: 1 },
            { page: 5.5, expected: 1 },
            { page: true, expected: 1 },
            { page: false, expected: 1 },
            { page: {}, expected: 1 },

            { page: 1, expected: 1 },
            { page: 2, expected: 2 },
        ])("should be able to create SearchParams instance", ({ page, expected }) => {
            expect(new SearchParams({ page: page as any }).page).toBe(expected);
        });
    });
    describe("perPage property", () => {
        it("should be able to set default value to 15", () => {
            const params = new SearchParams();
            expect(params.perPage).toBe(15);
        });
        it.each([
            { perPage: null, expected: 15 },
            { perPage: undefined, expected: 15 },
            { perPage: "", expected: 15 },
            { perPage: "fake", expected: 15 },
            { perPage: 0, expected: 15 },
            { perPage: -1, expected: 15 },
            { perPage: 5.5, expected: 15 },
            { perPage: true, expected: 15 },
            { perPage: false, expected: 15 },
            { perPage: {}, expected: 15 },

            { perPage: 1, expected: 1 },
            { perPage: 2, expected: 2 },
            { perPage: 10, expected: 10 },
        ])("should be able to create SearchParams instance", ({ perPage, expected }) => {
            expect(new SearchParams({ perPage: perPage as any }).perPage).toBe(expected);
        });
    });
    describe("sort property", () => {
        it("should be able to set default value to null", () => {
            const params = new SearchParams();
            expect(params.sort).toBeNull();
        });
        it.each([
            { sort: null, expected: null },
            { sort: undefined, expected: null },
            { sort: "", expected: null },
            { sort: 0, expected: "0" },
            { sort: -1, expected: "-1" },
            { sort: 5.5, expected: "5.5" },
            { sort: true, expected: "true" },
            { sort: false, expected: "false" },
            { sort: {}, expected: "[object Object]" },
            { sort: "field", expected: "field" },
        ])("should be able to create SearchParams instance", ({ sort, expected }) => {
            expect(new SearchParams({ sort: sort as any }).sort).toBe(expected);
        });
    });
    describe("sortDir property", () => {
        it("should be able to set default value to null if !sort", () => {
            let params = new SearchParams();
            expect(params.sortDir).toBeNull();

            params = new SearchParams({ sortDir: null });
            expect(params.sortDir).toBeNull();

            params = new SearchParams({ sortDir: "" as any });
            expect(params.sortDir).toBeNull();
        });
        it.each([
            { sortDir: null, expected: "ASC" },
            { sortDir: undefined, expected: "ASC" },
            { sortDir: "", expected: "ASC" },
            { sortDir: 0, expected: "ASC" },
            { sortDir: "fake", expected: "ASC" },

            { sortDir: "asc", expected: "ASC" },
            { sortDir: "ASC", expected: "ASC" },
            { sortDir: "desc", expected: "DESC" },
            { sortDir: "DESC", expected: "DESC" },
        ])("should be able to create SearchParams instance", ({ sortDir, expected }) => {
            expect(
                new SearchParams({ sort: "some field", sortDir: sortDir as any }).sortDir,
            ).toBe(expected);
        });
    });
    describe("filter property", () => {
        it("should be able to set default value to null", () => {
            const params = new SearchParams();
            expect(params.filter).toBeNull();
        });
        it.each([
            { filter: null, expected: null },
            { filter: undefined, expected: null },
            { filter: "", expected: null },

            { filter: 0, expected: "0" },
            { filter: -1, expected: "-1" },
            { filter: 5.5, expected: "5.5" },
            { filter: true, expected: "true" },
            { filter: false, expected: "false" },
            { filter: "field", expected: "field" },
        ])("should be able to create SearchParams instance", ({ filter, expected }) => {
            expect(
                new SearchParams({ sort: "some field", filter: filter as any }).filter,
            ).toBe(expected);
        });
    });
});
