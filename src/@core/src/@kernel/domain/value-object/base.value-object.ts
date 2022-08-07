import { isEqual } from "lodash";

export abstract class ValueObject<T> {
    constructor(public readonly value: T) {}

    equals(valueObject: this): boolean {
        if (!valueObject) return false;

        if (typeof valueObject.value !== typeof this.value) return false;

        if (typeof valueObject.value !== "object" && valueObject.value !== this.value)
            return false;

        if (!isEqual(valueObject.value, this.value)) return false;

        return true;
    }
}
