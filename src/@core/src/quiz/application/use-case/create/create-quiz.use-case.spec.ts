import { CreateRepository } from "src/@kernel/domain";
import { Quiz, QuizFactory } from "src/quiz/domain";
import { QuizFixture } from "src/quiz/domain/test/quiz.fixture";
import { CreateQuizUseCase } from "../create-quiz.use-case";

describe("CreateQuizUseCase unit tests (UseCase)", () => {
    const repository: jest.Mocked<CreateRepository<Quiz>> = {
        create: jest.fn(),
    };
    beforeEach(() => {
        repository.create.mockClear();
    });
    describe("happy path", () => {
        it("should be able to call factory correctly", async () => {
            const spyOnFactory = jest.spyOn(QuizFactory, "create");
            const sut = new CreateQuizUseCase(repository);
            const input = QuizFixture.getValidFactoryData();

            const response = await sut.execute(input);

            expect(response).toBeUndefined();
            expect(spyOnFactory).toHaveBeenNthCalledWith(1, input);
        });
        it("should be able to call repository correctly", async () => {
            const sut = new CreateQuizUseCase(repository);
            const input = QuizFixture.getValidFactoryData();

            await sut.execute(input);

            expect(repository.create).toHaveBeenNthCalledWith(
                1,
                QuizFactory.create(input),
            );
        });
    });
    describe("unhappy path", () => {
        it("should be able to let the error pass through method", async () => {
            repository.create.mockRejectedValueOnce(new Error(""));
            const sut = new CreateQuizUseCase(repository);
            const input = QuizFixture.getValidFactoryData();

            await expect(async () => {
                await sut.execute(input);
            }).rejects.toThrowError();
        });
    });
});
