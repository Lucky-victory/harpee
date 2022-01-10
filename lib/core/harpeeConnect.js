class HarpeeConnect {
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
const harpeeConnect = new HarpeeConnect();
module.exports = harpeeConnect;
