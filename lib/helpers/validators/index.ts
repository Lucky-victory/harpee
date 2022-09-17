import {
    AnyKeyValueObject,
    IHarpeeField,
    IHarpeeSchemaConfig,
} from "../../interfaces/harpee.interface";

const util = require("./util");
const validateTypes = require("./validateTypes");

const validateKeys = require("./validateKeys");
const validateRequired = require("./validateRequired");

function validator(fields: AnyKeyValueObject, newRecord: AnyKeyValueObject) {
    const fieldTypes = [];
    const newRecordValuesType = [];
    const requiredKeys = [];
    const isEqualType = [];

    const schemaFieldKeys = util.splitObjectSorted(fields).keys;
    const fieldsValues = util.splitObjectSorted(fields).values;
    const newRecordKeys = util.splitObjectSorted(newRecord).keys;
    const newRecordValues = util.splitObjectSorted(newRecord).values;

    validateKeys({
        fieldKeys: schemaFieldKeys,
        dataKeys: newRecordKeys,
    });

    for (let i = 0; i < newRecordKeys.length; i++) {
        const fieldsValueType = util.isObject(fieldsValues[i])
            ? fieldsValues[i].type
            : fieldsValues[i];

        const itHasRequired = fieldsValues[i].required
            ? fieldsValues[i].required
            : null;

        requiredKeys.push(itHasRequired);

        fieldTypes.push(fieldsValueType);

        newRecordValuesType.push(newRecordValues[i]);

        const checkType =
            util.getType(fieldTypes[i]) ===
            util.getType(newRecordValuesType[i]);

        isEqualType.push(checkType);
    }

    validateTypes({
        types: isEqualType,
        dataKeys: newRecordKeys,
        dataTypes: newRecordValuesType,
        fieldTypes,
    });
    validateRequired({
        fieldKeys: schemaFieldKeys,
        dataValues: newRecordValues,
        requiredKeys,
    });
}

export default class SchemaValidator {
    private static _schemaFields: IHarpeeSchemaConfig["fields"];
    private static _newRecords: AnyKeyValueObject | AnyKeyValueObject[];
    validateKeys() {}

    validateValues() {}
    validateRequired() {}
    static validate(
        schemaFields: IHarpeeSchemaConfig["fields"],
        newRecords: AnyKeyValueObject | AnyKeyValueObject[]
    ) {
        SchemaValidator._schemaFields = schemaFields;
        SchemaValidator._newRecords = newRecords;
    }
}
// module.exports=validator;
