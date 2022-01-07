const Axios=require('axios').default;
const Util=require('../../helpers/utils');
function HarpeeHttp(config={}){
 this.config=config; 
}
Object.defineProperty(HarpeeHttp.prototype,'$requestHandler',{
  value:function(reqData,callback){
    let auth;
    const USERNAME = this.config.username;
    const PASSWORD = this.config.password;
    const TOKEN = this.config.token ;
    if (USERNAME && PASSWORD) {
      if (!Util.isUndefined(window) && Util.isFunction(window.btoa)) {
        auth = "Basic " + window.btoa(USERNAME + ':' + PASSWORD);
      }
      else {
    
        auth =
          "Basic " +
          Buffer.from(USERNAME + ':' + PASSWORD, "utf-8").toString("base64");
      }
    } else if (TOKEN) {
      auth = "Bearer " + TOKEN;
    }
      Axios({
        url:this.config.host,
        method:'post',
        headers:{
          'Content-Type':'application/json',
          Authorization:auth
        },
        data:
JSON.stringify(reqData)
  }).then((res)=>{
    callback(null,res.data)
  }).catch((err)=>{
    callback(err,null)
  })

  }
});
Object.defineProperty(HarpeeHttp.prototype,'$callbackOrPromise',{
  value:function(reqData,callback,singleData=false){
    if(Util.isUndefined(callback)){
    return new Promise((resolve,reject)=>{
      this.$requestHandler(reqData,(err,data)=>{
        if(err) return reject(err);
        try{
          if(single){
            return resolve(data[0])
          }
          return resolve(data)
        }
        catch(err){
         return reject(err)
        }
      });
    })
  }
  this.$requestHandler(reqData,(err,data)=>{
    if(err){
      callback(err,null)
    }
    else{
    try{
      if(single){
      callback(null,data[0])
        
      }else{
        
      callback(null,data)
      }
    }
    catch(err){
      callback(err,null)
    }
    }
  })

  }
});


module.exports= HarpeeHttp;