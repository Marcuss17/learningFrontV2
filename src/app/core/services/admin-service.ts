import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "./common-services";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
  })
  export class AdminService {

    constructor(private http: HttpClient, private commonService: CommonService) {}
    

    getPostulants(page): Observable<any>{
      const data = {
        params:{
          page : page,
        }
      };
      return this.http.get(this.commonService.baseUrl + "/upgrade",data);
    }

    getPostulant(id) : Observable<any>{
      return this.http.get(this.commonService.baseUrl + "/user/id/"+id);
    }
    
    acceptCurator(iduser,idadmin,idupgrade) : Observable<any>{
      const data = {}  
      return this.http.post(this.commonService.baseUrl + "/upgrade/accept/"+iduser+"/"+idadmin+"/"+idupgrade,data);
    }


    negateCurator(iduser,idadmin,idupgrade) : Observable<any>{
      const data = {};
      return this.http.post(this.commonService.baseUrl + "/upgrade/negate/"+iduser+"/"+idadmin+"/"+idupgrade,data);
    }

  }

