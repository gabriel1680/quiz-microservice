import { idFixture } from "src/@kernel/domain/test/unique-entity-id.fixture";
import { Quiz } from "../quiz.entity";

describe("Quiz unit tests (Entity)", () => {
    const validId = idFixture;

    it("should be able to create a Quiz", () => {
        const questions = [
            {
                id: 1,
                title: "some question title",
                answers: [
                    { id: "a", text: "yes" },
                    { id: "b", text: "no" },
                ],
                correctAnswer: "b",
            },
            {
                id: 2,
                title: "another question title",
                answers: [
                    { id: "a", text: "yes" },
                    { id: "b", text: "no" },
                ],
                correctAnswer: "a",
            },
        ];
        const quiz = new Quiz(
            {
                title: "Quiz sobre animais",
                questions,
            },
            validId,
        );
        expect(quiz).toBeInstanceOf(Quiz);
        expect(quiz.title).toBe("Quiz sobre animais");
        expect(quiz.questions).toHaveLength(questions.length);
    });
});
