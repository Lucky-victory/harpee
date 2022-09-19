import {
    AnyKeyValueObject,
    IHarpeeSchemaConfig,
} from "../../interfaces/harpee.interface";
import { HarpeeSchemaFieldsType as HType } from "../../core/htype";
import Utils from "../utils";

export class SchemaValidator {
    private static _schemaFields: IHarpeeSchemaConfig;

    private static _newRecords: AnyKeyValueObject | AnyKeyValueObject[];

    static validate(
        schemaConfig: IHarpeeSchemaConfig,
        newRecords: AnyKeyValueObject | AnyKeyValueObject[]
    ) {
        const validationResults = [];
        const primaryKey = schemaConfig["primaryKey"];
        const fields = Object.assign(schemaConfig.fields, {
            [primaryKey as string]: [HType.number(), HType.string()],
        });
        const schema = HType.object(fields);
        if (Utils.isArray(newRecords)) {
            for (const record of newRecords as AnyKeyValueObject[]) {
                const { error, value } = schema.validate(record);
                validationResults.push({ error, value });
            }
            return validationResults;
        }
        const { error, value } = schema.validate(newRecords);
        return { error, value };
    }
}
