import { AnyKeyValueObject, IHarpeeSchemaConfig } from "../../interfaces/harpee.interface";
import { ValidationError } from "joi";
export declare class SchemaValidator {
    private static _schemaFields;
    private static _newRecords;
    static validate(schemaConfig: IHarpeeSchemaConfig, newRecords: AnyKeyValueObject | AnyKeyValueObject[]): {
        error: ValidationError[];
        value: any[];
    } | {
        error: import("joi").ValidationError | undefined;
        value: any;
    };
}
