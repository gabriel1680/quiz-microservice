import { idFixture } from "src/@kernel/domain/test/unique-entity-id.fixture";
import { Question } from "../question.entity";

describe("Question unit tests (Entity)", () => {
    it("should be able to create a Question", () => {
        const data = {
            title: "some question title",
            correctAnswer: "a",
            answers: [{ id: "a", text: "some answer" }],
        };

        const question = new Question(data, idFixture.generate());

        expect(question).toBeInstanceOf(Question);
        expect(question).toHaveProperty("title", data.title);
        expect(question).toHaveProperty("correctAnswer", data.correctAnswer);
        expect(question).toHaveProperty("answers", data.answers);
    });
});
