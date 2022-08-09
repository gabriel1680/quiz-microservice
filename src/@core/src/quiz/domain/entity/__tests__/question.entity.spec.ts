import { idFixture } from "src/@kernel/domain/test/unique-entity-id.fixture";
import { Answer } from "src/quiz/domain/value-object/answer.value-object";
import { EntityValidationError, Question, QuestionProperties } from "../question.entity";

describe("Question unit tests (Entity)", () => {
    let validData: QuestionProperties;

    beforeEach(() => {
        validData = {
            title: "some question title",
            correctAnswer: "a",
            answers: [
                Answer.create({ id: "a", text: "some answer" }),
                Answer.create({ id: "b", text: "another answer" }),
                Answer.create({ id: "c", text: "last answer" }),
            ],
        };
    });
    describe("instantiate", () => {
        it("should be able to create a Question", () => {
            const data = { ...validData };
            const question = new Question(data, idFixture.generate());

            expect(question).toBeInstanceOf(Question);
            expect(question).toHaveProperty("title", data.title);
            expect(question).toHaveProperty("correctAnswer", data.correctAnswer);
            expect(question).toHaveProperty("answers", data.answers);
        });
    });
    describe("validation", () => {
        it("should be able to throw error if created with invalid props", () => {
            const data = { ...validData };

            for (const key of Object.keys(data)) {
                const newData = { ...data };
                newData[key] = undefined;
                const actual = () => new Question(newData as any);
                expect(actual).toThrowError(EntityValidationError);
            }
        });
        it("should be able to throw error if created with invalid state", () => {
            const invalidStates = [
                {
                    ...validData,
                    answers: [Answer.create({ id: "a", text: "some answer" })],
                },
                {
                    ...validData,
                    correctAnswer: "d",
                },
                {
                    ...validData,
                    answers: [
                        Answer.create({ id: "a", text: "some answer" }),
                        Answer.create({ id: "a", text: "another answer" }),
                    ],
                },
                {
                    ...validData,
                    answers: [
                        Answer.create({ id: "a", text: "some answer" }),
                        Answer.create({ id: "b", text: "some answer" }),
                    ],
                },
                {
                    ...validData,
                    answers: [
                        Answer.create({ id: "a", text: "some answer" }),
                        Answer.create({ id: "b", text: "some answer" }),
                        {},
                    ],
                },
            ];

            for (const state of invalidStates) {
                const actual = () => new Question(state as any);
                expect(actual).toThrowError(EntityValidationError);
            }
        });
    });
    describe("update", () => {
        it("should be able to add answer", () => {
            const data = { ...validData };
            const newAnswer = Answer.create({ id: "d", text: "new answer text" });
            const question = new Question(data);
            const spyOnValidate = jest.spyOn(question, "validate");
            const spyOnUpdate = jest.spyOn(question, "update");

            question.addAnswer(newAnswer);

            expect(question.answers).toHaveLength(4);
            expect(spyOnValidate).toHaveBeenCalledTimes(1);
            expect(spyOnUpdate).toHaveBeenCalledTimes(1);
        });
        it("should be able to remove answer", () => {
            const data = { ...validData };
            const toBeRemovedAnswer = Answer.create({ id: "b", text: "another answer" });
            const question = new Question(data);
            const spyOnValidate = jest.spyOn(question, "validate");
            const spyOnUpdate = jest.spyOn(question, "update");

            question.removeAnswer(toBeRemovedAnswer);

            expect(question.answers).toHaveLength(2);
            expect(spyOnValidate).toHaveBeenCalledTimes(1);
            expect(spyOnUpdate).toHaveBeenCalledTimes(1);
        });
        it("should not be able to remove answer", () => {
            const data = { ...validData };
            const toBeRemovedAnswer = Answer.create({ id: "f", text: "another answer" });
            const question = new Question(data);
            const spyOnValidate = jest.spyOn(question, "validate");
            const spyOnUpdate = jest.spyOn(question, "update");

            question.removeAnswer(toBeRemovedAnswer);

            expect(question.answers).toHaveLength(3);
            expect(spyOnValidate).not.toHaveBeenCalled();
            expect(spyOnUpdate).not.toHaveBeenCalled();
        });
        it("should be able to update values", () => {
            const data = { ...validData };
            const question = new Question(data);
            const updateData = { title: "new title", correctAnswer: "b" };
            const spyOnValidate = jest.spyOn(question, "validate");
            const spyOnUpdate = jest.spyOn(question, "update");

            question.updateValues(updateData);

            expect(question.title).toBe(updateData.title);
            expect(question.correctAnswer).toBe(updateData.correctAnswer);
            expect(question.answers).toHaveLength(3);
            expect(spyOnValidate).toHaveBeenCalledTimes(1);
            expect(spyOnUpdate).toHaveBeenCalledTimes(1);
        });
    });
});
