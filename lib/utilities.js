const HarpeeUtilities = require('./core/harpeeUtilities');

function Utilities() {
    HarpeeUtilities.call(this)
}
Utilities.prototype.addUser = HarpeeUtilities.prototype.addUser;

Utilities.prototype.addRole = HarpeeUtilities.prototype.addRole;

Utilities.prototype.listRoles = HarpeeUtilities.prototype.listRoles;
Utilities.prototype.listUsers = HarpeeUtilities.prototype.listUsers;

Utilities.prototype.createSchema = HarpeeUtilities.prototype.createSchema;

Utilities.prototype.dropSchema = HarpeeUtilities.prototype.dropSchema
Utilities.prototype.describeSchema = HarpeeUtilities.prototype.describeSchema;

Utilities.prototype.createTable = HarpeeUtilities.prototype.createTable;
Utilities.prototype.dropTable = HarpeeUtilities.prototype.dropTable;

Utilities.prototype.describeTable = HarpeeUtilities.prototype.describeTable;

module.exports=Utilities;