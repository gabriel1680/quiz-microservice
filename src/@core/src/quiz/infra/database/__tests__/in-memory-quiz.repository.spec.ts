import { EntityNotFoundError } from "src/@kernel/domain";
import { Quiz } from "src/quiz/domain";
import { QuizFixture } from "src/quiz/domain/test/quiz.fixture";
import { InMemoryQuizRepository } from "../in-memory-quiz.repository";

describe("InMemoryQuiz unit tests (Repository)", () => {
    const sut = new InMemoryQuizRepository();

    it("should be able to push a quiz model into items array", async () => {
        const quizEntity = QuizFixture.getEntity();

        const result = await sut.create(quizEntity);

        expect(result).toBeUndefined();
        expect(sut.quizzes).toHaveLength(1);
        expect(sut.quizzes[0]).toBeInstanceOf(Quiz);
    });
    it("should be able to throw Error if not quiz not found", async () => {
        const actual = async () => await sut.get("some id");

        await expect(actual).rejects.toThrowError(EntityNotFoundError);
    });
    it("should be able to get a quiz by id", async () => {
        const entity = QuizFixture.getEntity();
        sut.create(entity);

        const quiz = await sut.get(entity.id);

        expect(quiz).toBeInstanceOf(Quiz);
        expect(quiz === entity).toBeTruthy();
    });
});
