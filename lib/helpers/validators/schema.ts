import {
    AnyKeyValueObject,
    IHarpeeSchemaConfig,
} from "../../interfaces/harpee.interface";
import { HarpeeSchemaFieldsType as HType } from "../../core/htype";

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

        const { error, value } = schema.validate(newRecords);
        return { error, value };
    }
}
