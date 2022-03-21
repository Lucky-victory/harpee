import {ConnectionConfig} from "./harpeeConnect";


class HarpeeConnectConfig implements HarpeeConnectConfigStatic {
   private config:ConnectionConfig;
    constructor(config?:ConnectionConfig) {
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


export interface HarpeeConnectConfigStatic{
   setConfig:(config:ConnectionConfig)=>void;
   getConfig:()=>ConnectionConfig;
}
export default harpeeConnectConfig\;
