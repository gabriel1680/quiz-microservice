import { SearchRepository } from "src/@kernel/domain";
import { Quiz } from "src/quiz/domain";
import { SearchQuizParams } from "src/quiz/domain/repository/quiz.search-params";
import { QuizSearchResult } from "src/quiz/domain/repository/quiz.search-result";
import { QuizFixture } from "src/quiz/domain/test/quiz.fixture";
import { SearchQuizUseCase } from "../../search";

describe("SearchQuizByIdUseCase unit tests (UseCase)", () => {
    const repository: jest.Mocked<
        SearchRepository<Quiz, string, SearchQuizParams, QuizSearchResult>
    > = {
        sortableFields: [],
        search: jest.fn(),
    } as any;
    const sut = new SearchQuizUseCase(repository);
    beforeEach(() => {
        repository.search.mockClear();
    });
    describe("happy path", () => {
        it("should be able to find a Quiz", async () => {
            // @ts-expect-error because method is private
            const spyOnMapper = jest.spyOn(sut, "toOutput");
            const input = new SearchQuizParams();
            const quizEntity = QuizFixture.getEntity();
            const quizResolved = new QuizSearchResult({
                items: [quizEntity],
                total: 1,
                filter: "",
                currentPage: 1,
                perPage: 1,
                sort: "",
                sortDir: "ASC",
            });
            repository.search.mockResolvedValueOnce(quizResolved);

            const result = await sut.execute(input);

            expect(repository.search).toHaveBeenCalledTimes(1);
            expect(spyOnMapper).toHaveBeenNthCalledWith(1, expect.any(QuizSearchResult));
            expect(result).toHaveProperty("currentPage", 1);
            expect(result.items).toHaveLength(1);
        });
    });
    describe("unhappy path", () => {
        it("should be able to throw any Errors from repository", async () => {
            const input = new SearchQuizParams();
            repository.search.mockRejectedValue(new Error("test error"));

            const actual = async () => await sut.execute(input);

            await expect(actual).rejects.toThrowError();
            await expect(actual).rejects.toThrowError("test error");
        });
    });
});
