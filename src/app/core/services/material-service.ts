import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "./common-services";
import { Observable } from "rxjs";    
import { HttpHeaders } from '@angular/common/http';
import {  } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class MaterialServices {
  constructor(private http: HttpClient, private commonService: CommonService) {}
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

  curarMaterial(
    id_who_curate,
    id_material,
  ) : Observable<any>{
    const data = {}
    return this.http.post(this.commonService.baseUrl + "/curator/accept/"+id_who_curate+"/"+id_material, data);
  }

  negarMaterial(
    id_who_curate,
    id_material,
  ) : Observable<any>{
    const data = {}
    return this.http.post(this.commonService.baseUrl + "/curator/negate/"+id_who_curate+"/"+id_material, data);
  }
  

  createMaterial(
    id : number,
    name : string,
    description : string,
    course : string,
    grade : number,
    theme : string
  ): Observable<any> {
    const data = {
      id,
      name,
      description,
      course,
      grade,
      theme,
    };
    console.log(data);
    return this.http.post(this.commonService.baseUrl + "/material/create", data);
  }

  sendToCurar(
    id : number,
    status : number
  ):Observable<any>{
    const data = {} 
    return this.http.post(this.commonService.baseUrl + "/material/status/" + id + "/"+status,data);
  }

  sendToDelete(
    id,
    status
  ):Observable<any>{
    const data = {}
    return this.http.post(this.commonService.baseUrl + "/material/status/" + id + "/"+status,data);
  }

  sendFile(id, file) : Observable<any> {
    return this.http.post(this.commonService.baseUrl + "/storage/uploadFile/" + id + "/materiales", file);
  }
/*
  downloadMaterial(
    id : Number,
    list_of_files : any):
  Observable<any> {
    const data  = {
      list_of_files : list_of_files,
    };
    console.log(data);
    return this.http.post(this.commonService.baseUrl + "/uploads/download/" + id ,data);
  }
*/
  downloadMaterial(
    id : Number,
    list_of_files : any):
    Observable<any>{
      const data = {
        params:{
          list_of_files : list_of_files,
        }
      };

      return this.http.get(this.commonService.baseUrl + "/uploads/download/"+ id +"/",data);

    }
  

  getMyMaterials(id): Observable<any>{
    return this.http.get(this.commonService.baseUrl + "/user/mymaterials/"+id);
  }

  getMyFavouriteMaterials(id): Observable<any>{
    return this.http.get(this.commonService.baseUrl + "/user/myfavmaterials/"+id);
  }

  createFile(materialId, fileName, link, type) : Observable<any>{
    if(type == "application/pdf") {
      type = "PDF"
    } else if(type == "video/mp4"){
      type = "VIDEO"
    } else {
      type = "YOUTUBE_LINK"
    }
    const obj = {
      materialId : materialId,
      name : fileName,
      link : link,
      typeOfFile : type
    };
    return this.http.post(this.commonService.baseUrl + "/file", obj);
  }
}
