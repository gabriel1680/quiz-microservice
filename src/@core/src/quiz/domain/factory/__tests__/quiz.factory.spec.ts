import { idFixture } from "src/@kernel/domain/test/unique-entity-id.fixture";
import { Quiz } from "../../entity";
import { QuizFactory, QuizProps } from "..";
import { QuestionFixture } from "../../test/question.fixture";

describe("QuizFactory unit tests (Factory)", () => {
    it("should be able to create a Quiz with all required properties", () => {
        const data: QuizProps = {
            title: "some title",
            questions: [
                QuestionFixture.getValidFactoryData(),
                QuestionFixture.getValidFactoryData(),
            ],
        };
        const quiz = QuizFactory.create(data);

        expect(quiz).toBeInstanceOf(Quiz);
        expect(quiz).toHaveProperty("title", data.title);
        expect(quiz.questions).toHaveLength(data.questions.length);

        expect(quiz).toHaveProperty("id");
        expect(quiz).toHaveProperty("createdAt");
        expect(quiz).toHaveProperty("updatedAt");
    });
    it("should be able to create a Quiz with all properties", () => {
        const id = idFixture.generate().value;
        const now = new Date();
        const data: QuizProps = {
            id,
            title: "some title",
            questions: [
                QuestionFixture.getValidFactoryData(),
                QuestionFixture.getValidFactoryData(),
            ],
            createdAt: now,
            updatedAt: now,
        };
        const quiz = QuizFactory.create(data);

        expect(quiz).toBeInstanceOf(Quiz);
        expect(quiz).toHaveProperty("title", data.title);
        expect(quiz.questions).toHaveLength(data.questions.length);

        expect(quiz.id.value).toBe(id);
        expect(quiz.createdAt).toBe(now);
        expect(quiz.updatedAt).toBe(now);
    });
});
