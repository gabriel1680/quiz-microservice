import { Entity, EntityTimestamp } from "src/@kernel/domain/entity/base.entity";
import { UniqueEntityId } from "src/@kernel/domain/value-object/unique-entity-id.value-object";
import { Answer } from "../value-object/answer.value-object";

export class Question extends Entity<QuestionProperties> {
    constructor(props: QuestionProperties, id?: UniqueEntityId) {
        super(props, id);

        this.validate();
    }

    validate(): void {
        if (!this.title || typeof this.title !== "string") {
            throw new EntityValidationError("The 'title' field must be a string");
        }
        if (!this.correctAnswer || typeof this.correctAnswer !== "string") {
            throw new EntityValidationError("The 'correctAnswer' field must be a string");
        }
        if (!Array.isArray(this.answers) || this.answers.length < 2) {
            throw new EntityValidationError(
                "The 'answers' field must be an array with more than two items",
            );
        }
        this.answers.forEach(answer => {
            if (!(answer instanceof Answer))
                throw new EntityValidationError(
                    "The 'answers' field must follow the '{id: string, text: string}' pattern",
                );
        });
        const haveTheCorrectAnswer = this.answers.find(
            answer => this.correctAnswer === answer.value.id,
        );
        if (!haveTheCorrectAnswer)
            throw new EntityValidationError(
                "The field 'correctAnswer' must have the correspondent answer id",
            );
        const answers = [...this.answers];
        answers.forEach(answer => {
            const answersWithTheSameId = answers.filter(
                a => a.value.id === answer.value.id,
            );
            if (answersWithTheSameId.length > 1)
                throw new EntityValidationError(
                    "The 'answers' field must have unique id fields",
                );
            const answersWithTheSameText = answers.filter(
                a => a.value.text === answer.value.text,
            );
            if (answersWithTheSameText.length > 1)
                throw new EntityValidationError(
                    "The 'answers' field must have unique text fields",
                );
        });
    }

    addAnswer(answer: Answer): void {
        this.props.answers.push(answer);

        this.validate();
        this.update();
    }
    removeAnswer(answer: Answer): void {
        const index = this.props.answers.findIndex(a => answer.equals(a));

        if (index === -1) return;
        this.props.answers.splice(index, 1);

        this.validate();
        this.update();
    }
    updateValues(data: Pick<QuestionProperties, "title" | "correctAnswer">): void {
        this.title = data.title;
        this.correctAnswer = data.correctAnswer;

        this.validate();
        this.update();
    }

    get title(): string {
        return this.props.title;
    }
    private set title(v: string) {
        this.props.title = v;
    }

    get correctAnswer(): string {
        return this.props.correctAnswer;
    }
    private set correctAnswer(v: string) {
        this.props.correctAnswer = v;
    }

    get answers(): QuestionProperties["answers"] {
        return this.props.answers;
    }
}

export type QuestionProperties = EntityTimestamp & {
    title: string;
    correctAnswer: string;
    answers: Answer[];
};

export class EntityValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "EntityValidationError";
    }
}
