const harpeeAxios=require('./harpeeAxios');
const Utils=require('../../helpers/utils');

function requestHandler(reqData,callback){
  
  harpeeAxios({data:
JSON.stringify(reqData)
  }).then((res)=>{
    callback(null,res.data)
  }).catch((err)=>{
    callback(err,null)
  })
}

function callbackOrPromise(reqData,callback,single=false){
  if(Utils.isUndefined(callback )){
    return new Promise((resolve,reject)=>{
      requestHandler(reqData,(err,data)=>{
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
  requestHandler(reqData,(err,data)=>{
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


module.exports=callbackOrPromise;
