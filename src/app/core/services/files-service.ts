import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "./common-services";
import { Observable } from "rxjs";
import { MaterialServices } from "./material-service";

@Injectable({
    providedIn: "root",
  })

  // ratings/searchrate/userId/materialId 
  export class AllFilesService {
    constructor(private http: HttpClient, private commonService: CommonService) {}
    getAllFiles(
        id
      ): Observable<any> {
        
        return this.http.get(this.commonService.baseUrl + "/material/id/"+id);
        }

    sendToFavorite(
      id_user,
      id_material
    ): Observable<any>{
      const data={};
      return this.http.post(this.commonService.baseUrl + "/user/favourite/"+id_user+"/"+id_material,data);
    }

    onMyFavorite(
      id_user,
      id_material,
    ):Observable<any>{

      return this.http.get(this.commonService.baseUrl + "/user/isfavourite/"+id_user+"/"+id_material ); 
    }

    addedView(
      id_user,
      id_material,
    ):Observable<any>{
      const data={}
      return this.http.post(this.commonService.baseUrl + "/material/view/" + id_user + "/"+id_material,data); 
    }


    adddownload(
      id_material,
    ): Observable<any>{
      const data ={}
      return this.http.post(this.commonService.baseUrl + "/material/download/"+id_material,data);
    }

    sendTemasdata(
      name,
      grade
    ): Observable<any> {
      const data = {
        params:{
          name : name,
          grade : grade
        }
      };
      return this.http.get(this.commonService.baseUrl + "/courses/themes", data);
    }

    deleteFromFavourite(
      id_user,
      id_material,
    ): Observable<any>{
      return this.http.delete(this.commonService.baseUrl + "/user/favourite/"+id_user+"/"+id_material);
    }

    getRateUser(
      userId,
      materialId
    ): Observable<any>{
      return this.http.get(this.commonService.baseUrl + "/ratings/searchrate/"+userId+"/"+materialId);
    }

    

    sendRating(
      materialId,
      userId ,
      learningPoints
    ) : Observable<any>{
      const data={
        materialId,
        userId,
        learningPoints,
      }
      console.log("ESTA ES LA DATA");
      console.log(data);
      return this.http.post(this.commonService.baseUrl + "/ratings",data);
    }
  }
 