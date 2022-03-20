import {ConnectionConfig} from "./harpeeConnect";
ConnectionConfig

class HarpeeConnectConfig {
   private config:ConnectionConfig;
    constructor(config?:ConnectionConfig = {}) {
        this.config = config;
    }
    setConfig(config:ConnectionConfig):void {
        this.config = config;
    }
    getConfig():ConnectionConfig {
        return this.config;
    }
}

const harpeeConnectConfig = new HarpeeConnectConfig();

export default harpeeConnectConfig;
