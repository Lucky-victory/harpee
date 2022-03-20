import axios from  'axios';
import util from "../helpers/util";

interface Config{
   host:string;
   username:string;
   password:string;
   token?:string;
}
class HarpeeHttp {
      private config:Config ;
   constructor(config:Config = {}) {
      this.config=config;
   }
   
  protected $requestHandler(reqBody:object, callback:(err:any,data:any)=> void) {
      
      let auth:string;
      const username:string = this.config.username;
      const password:string = this.config.password;
      const token:string|undefined = this.config.token;
      if (token) {
         auth = "Bearer " + token;
      }
      else if (username && password) {
      auth =
            "Basic " +
            Buffer.from(username + ":" + password, "utf-8").toString(
               "base64"
            );
      }
      const errorObj:object = {};
      axios({url:this.config.host, 
            method: "post",
            headers: {
               "Content-Type": "application/json",
               Authorization: auth,
            },
            data: JSON.stringify(reqBody),
         }).then((res) => {
            callback(null, res.data);
            
         })
         .catch((error) => {
            if (error.response) {
          errorObj['data']=error.response.data;     
          errorObj['status']=error.response.status;     
            } else if (error.request) {
   
         errorObj['error']=error.request
            } else {
       errorObj['error']=error.message;
            }
       errorObj['config']=error.config;
            
            callback(errorObj, null);
         });
   }

  protected $callbackOrPromise(reqBody:object, callback?:(err:any,result:any)=>void, single?:boolean = false):void|Promise<any> {
      if (util.isUndefined(callback)) {
         return new Promise((resolve, reject) => {
            this.$requestHandler(reqBody, (err, result) => {
            if (err) return reject(err);
               try {
               if(single)return resolve(result[0]);
                  else{
                     
                  return resolve(result);
                  } 
               } catch {
                  return reject(err);
               }
            });
         });
      }
      this.$requestHandler(reqBody, (err, result) => {
         if (err) {
            callback(err, null);
         } else {
            try {
               single ?
 callback(null, result[0])
                  : callback(null, result);

            } catch {
               callback(err, null);
            }
         }
      });
   }
}

export default HarpeeHttp;

