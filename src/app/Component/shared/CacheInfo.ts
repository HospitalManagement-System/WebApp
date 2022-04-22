import { User } from "src/app/models/User";

export class CacheInfo {
    static cacheMap:any = {};
    static clear(key:any=undefined,value:any=undefined) {
        if (typeof key != 'undefined' && typeof value != 'undefined')
            CacheInfo.cacheMap[key] = value;
        else
            CacheInfo.cacheMap={};
    }
    static set(key:any=undefined,subkey:any=undefined,value:any=undefined) {
        if (typeof subkey == "undefined" && typeof value == "undefined")
             CacheInfo.cacheMap[key] = {};
        else if(typeof value != "undefined")
             CacheInfo.cacheMap[key][subkey] = value;
        else
             CacheInfo.cacheMap[key] = subkey;
    }
    static get(key:any=undefined,subKey:any=undefined) {
        let value;
        if (typeof subKey != "undefined")
            value = CacheInfo.cacheMap[key][subKey];
        else
            value = CacheInfo.cacheMap[key];
        return value;
    }
    static delete(key:any=undefined,subkey:any=undefined,value:any=undefined) {
        if (typeof value != 'undefined')
          delete CacheInfo.cacheMap[key][subkey][value];
        else if(typeof subkey == 'undefined')
          delete CacheInfo.cacheMap[key];
        else
          delete CacheInfo.cacheMap[key][subkey];
    }
}


export class CommonHelper {
    static AddToLocalStorage(user:User) {
        localStorage.setItem("currentUser", JSON.stringify(user));
    }
    static RemoveFromLocalStorage() {
        localStorage.removeItem("currentUser");
    }
    static GetFromLocalStorage(): any {
        let user = null;
        if (localStorage.getItem("currentUser") != null) {
            user = localStorage.getItem("currentUser");
        }
        return user;
    }
}