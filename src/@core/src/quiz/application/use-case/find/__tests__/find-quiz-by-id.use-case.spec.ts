import { GetRepository } from "src/@kernel/domain";
import { idFixture } from "src/@kernel/domain/test/unique-entity-id.fixture";
import { QuizOutputMapper } from "src/quiz/application/dto";
import { Quiz } from "src/quiz/domain";
import { QuizFixture } from "src/quiz/domain/test/quiz.fixture";
import { FindQuizByIdInput } from "../dto";
import { FindQuizByIdUseCase } from "../find-quiz-by-id.use-case";

describe("FindQuizByIdUseCase unit tests (UseCase)", () => {
    const repository: jest.Mocked<GetRepository<Quiz>> = {
        get: jest.fn(),
    };
    const sut = new FindQuizByIdUseCase(repository);
    beforeEach(() => {
        repository.get.mockClear();
    });
    it("should be able to find a Quiz", async () => {
        const spyOnMapper = jest.spyOn(QuizOutputMapper, "toOutput");
        const input: FindQuizByIdInput = { id: idFixture.generate().value };
        const quizResolved = QuizFixture.getEntity();
        repository.get.mockResolvedValueOnce(quizResolved);

        const result = await sut.execute(input);

        expect(repository.get).toHaveBeenNthCalledWith(1, input.id);
        expect(spyOnMapper).toHaveBeenNthCalledWith(1, expect.any(Quiz));
        expect(result).toHaveProperty("id", quizResolved.id.value);
    });
});
