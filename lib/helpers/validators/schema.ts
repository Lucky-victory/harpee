import {
    AnyKeyValueObject,
    IHarpeeSchemaConfig,
} from "../../interfaces/harpee.interface";
import { HarpeeSchemaFieldsType as HType } from "../../core/htype";
import Utils from "../utils";
import { ValidationError } from "joi";

export class SchemaValidator {
    private static _schemaFields: IHarpeeSchemaConfig;

    private static _newRecords: AnyKeyValueObject | AnyKeyValueObject[];

    static validate(
        schemaConfig: IHarpeeSchemaConfig,
        newRecords: AnyKeyValueObject | AnyKeyValueObject[]
    ) {
        const primaryKey = schemaConfig["primaryKey"];
        const fields = Object.assign(schemaConfig.fields, {
            [primaryKey as string]: [HType.number(), HType.string()],
        });
        const schema = HType.object(fields);
        if (Utils.isArray(newRecords)) {
            const errors: ValidationError[] = [];
            const values: any[] = [];
            for (const record of newRecords as AnyKeyValueObject[]) {
                const { error, value } = schema.validate(record);
                if (error) {
                    errors.push(error);
                }
                values.push(value);
            }
            const validationResults = { error: errors, value: values };
            return validationResults;
        }
        const { error, value } = schema.validate(newRecords);

        return { error, value };
    }
}
