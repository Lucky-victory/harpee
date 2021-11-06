const harpeeAxios=require('./harpeeAxios');
const U=require('../../helpers/utils');

function requestHandler(reqData,callback){
  
  harpeeAxios({data:
JSON.stringify(reqData)
  }).then((res)=>{
    callback(null,res.data)
  }).catch((err)=>{
    callback(err,null)
  })
}

function callbackOrPromise(reqData,callback){
  if(U.isUndefined(callback )){
    return new Promise((resolve,reject)=>{
      requestHandler(reqData,(err,data)=>{
        if(err) return reject(err);
        try{
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
      callback(err)
    }
    else{
    try{
      callback(null,data)
    }
    catch(err){
      callback(err)
    }
    }
  })
}


module.exports=callbackOrPromise;
