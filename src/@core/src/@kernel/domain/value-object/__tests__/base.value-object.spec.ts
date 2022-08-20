import { ValueObject } from "../base.value-object";

describe("ValueObject unit tests (Value Object - Base)", () => {
    class StubVO extends ValueObject<any> {
        constructor(value: any) {
            super(value);
        }
    }
    const vo = new StubVO("name");
    expect(vo).toHaveProperty("value", "name");
    it("should be able to create a V.O", () => {
        expect(vo).toHaveProperty("value", "name");
    });
    it("should be able to test equality for basic value object types", () => {
        const values = [1, true, "another name", {}, []];
        for (const value of values) {
            const anotherVO = new StubVO(value);
            expect(vo.equals(anotherVO)).toBeFalsy();
        }
    });
    it("should be able to test equality for object value", () => {
        const voAsObjectValue = new StubVO({ prop1: "hello", prop2: "world" });
        const voAsObjectValue2 = new StubVO({ prop1: "hello", prop2: "world" });
        expect(voAsObjectValue.equals(voAsObjectValue2)).toBeTruthy();

        const diffProps = [{ prop1: "hello", prop2: "" }, { prop1: "hello" }];
        for (const diffProp of diffProps) {
            const voAsObjectValue3 = new StubVO(diffProp);
            expect(voAsObjectValue.equals(voAsObjectValue3)).toBeFalsy();
        }
    });
    it("should be able to return the vo value as string", () => {
        const arranges = [
            { value: "some string", expected: "some string" },
            { value: 10_000, expected: "10000" },
            { value: { prop1: "something" }, expected: "[object Object]" },
        ];

        for (const arrange of arranges) {
            const vo = new StubVO(arrange.value);
            expect(`${vo}`).toBe(arrange.expected);
            expect(vo.toString()).toBe(arrange.expected);
        }
    });
});
