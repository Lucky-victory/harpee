import { AnyKeyValueObject, IHarpeeSchemaConfig } from "../../interfaces/harpee.interface";
export default class SchemaValidator {
    private static _schemaFields;
    private static _newRecords;
    validateKeys(): void;
    validateValues(): void;
    validateRequired(): void;
    static validate(schemaFields: IHarpeeSchemaConfig["fields"], newRecords: AnyKeyValueObject | AnyKeyValueObject[]): void;
}
