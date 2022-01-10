class HarpeeConfig {
    constructor(modelSchemaConfig = {}) {
        this.modelSchemaConfig = modelSchemaConfig;
    }
    setConfig(modelSchemaConfig) {
        this.modelSchemaConfig = modelSchemaConfig;
    }
    getConfig() {
        return this.modelSchemaConfig;
    }
}
const harpeeConfig = new HarpeeConfig();
module.exports = harpeeConfig;
