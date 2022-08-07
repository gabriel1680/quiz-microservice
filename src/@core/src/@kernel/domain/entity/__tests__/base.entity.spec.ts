import { UniqueEntityId } from "../../value-object/unique-entity-id.value-object";
import { Entity, EntityTimestamp } from "../base.entity";

class StubEntity extends Entity<Props> {
    constructor(props: Props, id?: UniqueEntityId) {
        super(props, id);
    }
}
type Props = EntityTimestamp & { prop: string };

describe("Entity unit tests (Entity - Base)", () => {
    it("should be able to validate equality", () => {
        const entity = new StubEntity({ prop: "hello" });

        expect(entity).toHaveProperty("createdAt");
        expect(entity).toHaveProperty("updatedAt");
    });
});
