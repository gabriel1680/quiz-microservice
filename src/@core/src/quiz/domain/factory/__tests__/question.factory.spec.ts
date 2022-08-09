import { idFixture } from "src/@kernel/domain/test/unique-entity-id.fixture";
import { Question } from "../../entity";
import { QuestionFactory, QuestionProps } from "../question.factory";

describe("QuestionFactory unit tests (Factory)", () => {
    it("should be able to create a Question with all required properties", () => {
        const data: QuestionProps = {
            title: "some title",
            correctAnswer: "a",
            answers: [
                { id: "a", text: "some text" },
                { id: "b", text: "another text" },
            ],
        };
        const question = QuestionFactory.create(data);

        expect(question).toBeInstanceOf(Question);
        expect(question).toHaveProperty("title", data.title);
        expect(question).toHaveProperty("correctAnswer", data.correctAnswer);
        expect(question.answers).toHaveLength(data.answers.length);

        expect(question).toHaveProperty("id");
        expect(question).toHaveProperty("createdAt");
        expect(question).toHaveProperty("updatedAt");
    });
    it("should be able to create a Question with all properties", () => {
        const id = idFixture.generate().value;
        const now = new Date();
        const data: QuestionProps = {
            id,
            title: "some title",
            correctAnswer: "a",
            answers: [
                { id: "a", text: "some text" },
                { id: "b", text: "another text" },
            ],
            createdAt: now,
            updatedAt: now,
        };
        const question = QuestionFactory.create(data);

        expect(question).toBeInstanceOf(Question);
        expect(question).toHaveProperty("title", data.title);
        expect(question).toHaveProperty("correctAnswer", data.correctAnswer);
        expect(question.answers).toHaveLength(data.answers.length);

        expect(question.id.value).toBe(id);
        expect(question.createdAt).toBe(now);
        expect(question.updatedAt).toBe(now);
    });
});
