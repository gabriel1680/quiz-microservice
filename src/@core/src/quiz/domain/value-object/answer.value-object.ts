import { ValueObject } from "src/@kernel/domain/value-object/base.value-object";

export class Answer extends ValueObject<AnswerProps> {
    private constructor(props: AnswerProps) {
        super(props);
    }

    static validate(answer: AnswerProps): boolean {
        if (!answer) return false;

        if (typeof answer !== "object") return false;

        if (!answer["id"] || !answer["text"]) return false;

        if (typeof answer["text"] !== "string") return false;

        if (answer["text"].length < 1) return false;

        return true;
    }

    static create(props: AnswerProps): Answer {
        if (!Answer.validate(props)) throw new InvalidAnswerError();
        return new Answer(props);
    }
}

export class InvalidAnswerError extends Error {
    constructor() {
        super("invalid answer format");
        this.name = "InvalidAnswerError";
    }
}

export type AnswerProps = {
    id: string | number;
    text: string;
};
