import { Question, QuestionProperties } from "../entity";
import { QuestionProps } from "../factory";
import { Answer } from "../value-object";

export class QuestionFixture {
    static getValidEntityData(): QuestionProperties {
        return {
            title: "some question title",
            correctAnswer: "a",
            answers: [
                Answer.create({ id: "a", text: "some answer" }),
                Answer.create({ id: "b", text: "another answer" }),
                Answer.create({ id: "c", text: "last answer" }),
            ],
        };
    }
    static getEntity(): Question {
        return new Question(QuestionFixture.getValidEntityData());
    }
    static getValidFactoryData(): QuestionProps {
        return {
            title: "some question title",
            correctAnswer: "a",
            answers: [
                { id: "a", text: "some answer" },
                { id: "b", text: "another answer" },
                { id: "c", text: "last answer" },
            ],
        };
    }
}
