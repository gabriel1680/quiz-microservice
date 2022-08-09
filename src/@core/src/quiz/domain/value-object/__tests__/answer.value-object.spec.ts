import { Answer, AnswerProps, InvalidAnswerError } from "../answer.value-object";

describe("Answer unit tests (Value Object)", () => {
    describe("validate", () => {
        it("should be able to validate answer", () => {
            const data: AnswerProps = { id: "a", text: "some answer text" };
            expect(Answer.validate(data)).toBeTruthy();
        });
        it("should be able to validate answer", () => {
            const invalids = [
                { id: null, text: "" },
                { id: undefined, text: "some text" },
                { id: "some id", text: undefined },
                { id: null, text: 1 },
            ];
            for (const data of invalids) expect(Answer.validate(data as any)).toBeFalsy();
        });
    });
    describe("create", () => {
        it("should be able to create a Answer", () => {
            const answer = Answer.create({ id: "a", text: "some answer text" });
            expect(answer).toBeInstanceOf(Answer);
        });
        it("should be able to throw a InvalidAnswerError", () => {
            const actual = () =>
                Answer.create({ id: undefined, text: "some answer text" });
            expect(actual).toThrowError(InvalidAnswerError);
            expect(actual).toThrowError("invalid answer format");
        });
    });
});
