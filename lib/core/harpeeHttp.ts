import axios from  'axios';
import util from '../helpers/util';
import {ConnectionConfig} from "./harpeeConnect"

const HarpeeHttp: HarpeeHttpConstructor = class HarpeeHttp implements HarpeeHttpStatic{
     private  config:ConnectionConfig ;
   constructor(config:ConnectionConfig) {
      this.config=config;
   }
   
  private $requestHandler(reqBody:ReqBody<{}>, callback:Callback) {
      
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

  protected $callbackOrPromise(reqBody:ReqBody<{}>, callback?:(err:any,result:any)=>void, single:boolean = false):void|Promise<any> {
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

export type ReqBody<T>=T & {[key:string]:unknown};
export type Callback=(err:any,data:any)=>void;
export interface HarpeeHttpConstructor{
   new(config:ConnectionConfig):HarpeeHttpStatic
}
export interface HarpeeHttpStatic{
   config:ConnectionConfig;
$requestHandler(reqBody:ReqBody<{}>,callback:Callback):void;
$callbackOrPromise(reqBody:ReqBody<{}>,callback:Callback):void;

}

export default HarpeeHttp;

