import { Entity } from "../entity";
import { UniqueEntityId } from "../value-object";

export interface GetRepository<O extends Entity<any>> {
    get(id: string | UniqueEntityId): Promise<O>;
}
