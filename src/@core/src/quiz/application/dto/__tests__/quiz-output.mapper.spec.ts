import { QuizFixture } from "src/quiz/domain/test/quiz.fixture";
import { QuizOutputMapper } from "../quiz-output.mapper";

describe("QuizOutputMapper unit tests (Mapper)", () => {
    it("should be able to create a QuizOutputDTO object from domain entity", () => {
        const entity = QuizFixture.getEntity();

        const outputQuiz = QuizOutputMapper.toOutput(entity);
        const outputQuestions = QuizOutputMapper.questionsToOutput(entity.questions);

        expect(outputQuiz).toEqual({
            id: entity.id.value,
            title: entity.title,
            questions: outputQuestions,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    });
});
