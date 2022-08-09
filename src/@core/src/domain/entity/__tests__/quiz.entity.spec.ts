import { idFixture } from "src/@kernel/domain/test/unique-entity-id.fixture";
import { Answer } from "src/domain/value-object/answer.value-object";
import { EntityValidationError, Question } from "../question.entity";
import { Quiz, QuizProperties } from "../quiz.entity";

describe("Quiz unit tests (Entity)", () => {
    let validData: QuizProperties;
    beforeEach(() => {
        validData = {
            title: "Quiz sobre animais",
            questions: [
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
            ],
        };
    });

    it("should be able to create a Quiz", () => {
        const quiz = new Quiz(validData, idFixture.generate());
        expect(quiz).toBeInstanceOf(Quiz);
        expect(quiz.title).toBe("Quiz sobre animais");
        expect(quiz.questions).toHaveLength(validData.questions.length);
    });

    it("should be able to throw error if required props are not valid", () => {
        for (const key of Object.keys(validData)) {
            const invalidProps = { ...validData };
            invalidProps[key] = undefined;
            expect(() => {
                new Quiz(invalidProps);
            }).toThrowError(EntityValidationError);
        }
    });
    it("should be able to throw error if the state are not valid", () => {
        const invalidStates = [
            {
                ...validData,
                questions: [
                    new Question({
                        title: "some question title",
                        answers: [
                            Answer.create({ id: "a", text: "yes" }),
                            Answer.create({ id: "b", text: "no" }),
                        ],
                        correctAnswer: "b",
                    }),
                ],
            },
            {
                ...validData,
                questions: [{}],
            },
        ];
        for (const state of invalidStates) {
            expect(() => {
                new Quiz(state as any);
            }).toThrowError(EntityValidationError);
        }
    });
    it("should be able to update title", () => {
        const quiz = new Quiz(validData);
        const spyOnValidate = jest.spyOn(quiz, "validate");
        const spyOnUpdate = jest.spyOn(quiz, "update");
        const updatedState = { title: "new title" };

        quiz.updateValues(updatedState);

        expect(quiz.title).toBe(updatedState.title);
        expect(spyOnValidate).toHaveBeenCalledTimes(1);
        expect(spyOnUpdate).toHaveBeenCalledTimes(1);
    });
    it("should be able to add question", () => {
        const quiz = new Quiz(validData);
        const spyOnValidate = jest.spyOn(quiz, "validate");
        const spyOnUpdate = jest.spyOn(quiz, "update");
        const newQuestion = new Question({
            title: "some new question title",
            answers: [
                Answer.create({ id: "a", text: "yes" }),
                Answer.create({ id: "b", text: "no" }),
            ],
            correctAnswer: "b",
        });

        quiz.addQuestion(newQuestion);

        expect(quiz.questions).toHaveLength(3);
        expect(spyOnValidate).toHaveBeenCalledTimes(1);
        expect(spyOnUpdate).toHaveBeenCalledTimes(1);
    });
});
