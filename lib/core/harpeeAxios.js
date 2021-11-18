const axios=require('axios').default;
const U=require('../../helpers/utils');

function HarpeeHttp(config){
 this.config=config; 
}
Object.defineProperty(HarpeeHttp.prototype,'$requestHandler',{
  value:function(reqData,callback){
    let auth;
    const USERNAME = this.config && this.config.username || null;
    const PASSWORD = this.config && this.config.password || null;
    const TOKEN = this.config && this.config.token || null;
    if (USERNAME && PASSWORD) {
      if (!U.isUndefined(window) && typeof window.btoa === 'function') {
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
      axios({
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
    if(U.isUndefined(callback)){
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
      })
    })
  }
  this.$requestHandler(reqData,(err,data)=>{
    if(err){
      callback(err)
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
      callback(err)
    }
    }
  })

  }
});


module.exports= HarpeeHttp;