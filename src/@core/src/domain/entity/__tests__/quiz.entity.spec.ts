import { idFixture } from "src/@kernel/domain/test/unique-entity-id.fixture";
import { Answer } from "src/domain/value-object/answer.value-object";
import { Question } from "../question.entity";
import { Quiz } from "../quiz.entity";

describe("Quiz unit tests (Entity)", () => {
    it("should be able to create a Quiz", () => {
        const questions = [
            new Question({
                title: "some question title",
                answers: [
                    Answer.create({ id: "a", text: "yes" }),
                    Answer.create({ id: "b", text: "no" }),
                ],
                correctAnswer: "b",
            }),
            new Question({
                title: "another question title",
                answers: [
                    Answer.create({ id: "a", text: "yes" }),
                    Answer.create({ id: "b", text: "no" }),
                ],
                correctAnswer: "a",
            }),
        ];
        const quiz = new Quiz(
            {
                title: "Quiz sobre animais",
                questions,
            },
            idFixture.generate(),
        );
        expect(quiz).toBeInstanceOf(Quiz);
        expect(quiz.title).toBe("Quiz sobre animais");
        expect(quiz.questions).toHaveLength(questions.length);
    });
});
