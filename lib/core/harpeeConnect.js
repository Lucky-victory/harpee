
function HarpeeConnect(config={}){
  this.config=config;

}
HarpeeConnect.prototype.setConfig=function(config){
 this.config=config;
}
HarpeeConnect.prototype.getConfig=function(){
  return this.config;
}
const harpeeConnect=new HarpeeConnect();
module.exports=harpeeConnect;