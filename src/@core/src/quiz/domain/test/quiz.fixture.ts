import { Question, Quiz, QuizProperties } from "../entity";
import { QuizProps } from "../factory";
import { Answer } from "../value-object";

export class QuizFixture {
    static getValidEntityData(): QuizProperties {
        return {
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
    }
    static getEntity(): Quiz {
        return new Quiz(QuizFixture.getValidEntityData());
    }
    static getValidFactoryData(): QuizProps {
        return {
            title: "Quiz sobre animais",
            questions: [
                {
                    title: "some question title",
                    answers: [
                        { id: "a", text: "yes" },
                        { id: "b", text: "no" },
                    ],
                    correctAnswer: "b",
                },
                {
                    title: "another question title",
                    answers: [
                        { id: "a", text: "yes" },
                        { id: "b", text: "no" },
                    ],
                    correctAnswer: "a",
                },
            ],
        };
    }
}
