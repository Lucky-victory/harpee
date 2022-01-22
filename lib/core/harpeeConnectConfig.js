class HarpeeConnectConfig {
    constructor(config = {}) {
        this.config = config;
    }
    setConfig(config) {
        this.config = config;
    }
    getConfig() {
        return this.config;
    }
}
const harpeeConnectConfig = new HarpeeConnectConfig();
export default harpeeConnectConfig;
