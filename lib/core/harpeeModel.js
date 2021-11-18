const U=require('../../helpers/utils');
const HarpeeHttp=require('./harpeeHttp');
function harpeeModel(config){
  
  this.config=config;
  HarpeeHttp.call(this,config);
}
