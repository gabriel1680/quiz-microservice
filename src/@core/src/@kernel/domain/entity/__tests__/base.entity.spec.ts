import { UniqueEntityId } from "../../value-object/unique-entity-id.value-object";
import { Entity, EntityTimestamp } from "../base.entity";

class StubEntity extends Entity<Props> {
    constructor(props: Props, id?: UniqueEntityId) {
        super(props, id);
    }
}
type Props = EntityTimestamp & { prop: string };

describe("Entity unit tests (Entity - Base)", () => {
    it("should be able to instantiate an Entity without id or timestamp props", () => {
        const entity = new StubEntity({ prop: "hello" });

        expect(entity).toHaveProperty("id", expect.any(UniqueEntityId));
        expect(entity).toHaveProperty("createdAt");
        expect(entity).toHaveProperty("updatedAt");
    });
    it("should be able to instantiate an Entity", () => {
        const id = UniqueEntityId.create();
        const entity = new StubEntity(
            { prop: "hello", createdAt: new Date("2022-04-06") },
            id,
        );

        expect(entity).toHaveProperty("id", id);
        expect(entity).toHaveProperty("createdAt", new Date("2022-04-06"));
        expect(entity).toHaveProperty("updatedAt", expect.any(Date));
    });
    it("should be able to validate equality as falsy", () => {
        const entity = new StubEntity({ prop: "hello" });
        const entity2 = new StubEntity({ prop: "hello" });

        const equality = entity.equals(entity2);

        expect(equality).toBeFalsy();
    });
    it("should be able to validate equality as falsy for invalid type", () => {
        const invalidTypes = [null, undefined, "", 1, []];
        const entity = new StubEntity({ prop: "hello" });
        for (const type of invalidTypes) {
            const equality = entity.equals(type as any);
            expect(equality).toBeFalsy();
        }
    });
    it("should be able to validate equality as falsy for invalid objects", () => {
        const entity = new StubEntity({ prop: "hello" });
        const invalidTypes = [{ prop: "hello" }, { id: "hello" }, { id: entity.id }];
        for (const type of invalidTypes) {
            const equality = entity.equals(type as any);
            expect(equality).toBeFalsy();
        }
    });
    it("should be able to validate equality as truthy", () => {
        const id = UniqueEntityId.create();
        const entity = new StubEntity({ prop: "hello 1" }, id);
        const entity2 = new StubEntity({ prop: "hello 2" }, id);

        const equality = entity.equals(entity2);

        expect(equality).toBeTruthy();
    });
});
