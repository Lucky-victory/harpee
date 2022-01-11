class HarpeeModelConfig {
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
const harpeeModelConfig = new HarpeeModelConfig();
module.exports = harpeeModelConfig;
