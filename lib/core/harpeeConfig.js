function HarpeeConfig(modelSchemaConfig={}) {
  this.modelSchemaConfig=modelSchemaConfig;
}
HarpeeConfig.prototype.setConfig=function(modelSchemaConfig){
  this.modelSchemaConfig=modelSchemaConfig;
}
HarpeeConfig.prototype.getConfig=function(){
  return (this.modelSchemaConfig);
}
const harpeeConfig=new HarpeeConfig();
module.exports=harpeeConfig;