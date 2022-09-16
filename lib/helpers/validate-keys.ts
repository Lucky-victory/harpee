import Utils from "./utils";

function validateKeys({
    fieldKeys,
    dataKeys,
}: {
    fieldKeys: string[];
    dataKeys: string[];
}) {
    const allKeys = [];
    for (let k = 0; k < fieldKeys.length; k++) {
        allKeys.push(Utils.findStringInArray(fieldKeys, dataKeys[k]));
    }
    const compareKeys = Utils.findMultipleIndex(allKeys, false);
    if (compareKeys.length) {
        for (const cKey of compareKeys) {
            if (Utils.isUndefined(dataKeys[cKey])) {
                throw new Error(
                    "you are trying to create less columns than your schema, you should exclude them in your schema or add a placeholder for it"
                );
            }
            throw new Error(dataKeys[cKey] + " is not in your schema");
        }
    }
}
module.exports = validateKeys;
