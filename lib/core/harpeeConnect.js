const HarpeeHttp=require('./harpeeHttp');

function HarpeeConnect(config){
  this.config=config;
HarpeeHttp.call(this,config);
  
}
module.exports=HarpeeConnect;