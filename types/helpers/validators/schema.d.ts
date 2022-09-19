import { AnyKeyValueObject, IHarpeeSchemaConfig } from "../../interfaces/harpee.interface";
export declare class SchemaValidator {
    private static _schemaFields;
    private static _newRecords;
    static validate(schemaConfig: IHarpeeSchemaConfig, newRecords: AnyKeyValueObject | AnyKeyValueObject[]): {
        error: import("joi").ValidationError | undefined;
        value: any;
    }[] | {
        error: import("joi").ValidationError | undefined;
        value: any;
    };
}
