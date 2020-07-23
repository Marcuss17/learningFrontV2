import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage-service';
import { Router } from "@angular/router";
import { FilterPipe } from 'ngx-filter-pipe';
import { AdminService } from 'src/app/core/services/admin-service';
import * as moment from 'moment';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [StorageService],
  
})
export class AdminComponent implements OnInit {


  public userFilter: any = {
    name: "",
  };
  
  public copy: string;
  private AllPostulants : SinglePostulant[] = [];

  constructor(
    private router: Router, 
    private filterPipe: FilterPipe,
    private adminService: AdminService,
    private storageService : StorageService,
    ) { }

  ngOnInit() {

    this.adminService.getPostulants(0).subscribe(
      response =>{
        console.log(response);
        for(let val in response){
          console.log(response[val]);
          this.AllPostulants.push(new SinglePostulant(
            response[val].user.id,
            response[val].id,
            response[val].user.username,
            moment(response[val].solicitated).format('DD/MM/YYYY'),
            response[val].institucion,
            response[val].contentLink,
            response[val].description,
          ))
        }
        
      }, error => {
        console.log(error);
      }
    )


  }

  IrPostulante(curpostulant){
    console.log("enviar");
    const postulant = {
      id: curpostulant.id,
      link : curpostulant.link,
      description : curpostulant.description,
      date : curpostulant.fecha,
      id_material : curpostulant.id_material,
    }
    this.storageService.setPostulantLocalStorage(JSON.stringify(postulant));
    
    console.log(JSON.parse(this.storageService.getPostulantLocalStorage()));
    this.router.navigateByUrl("/postulant_curator");

  } 




}

export class SinglePostulant {
  public id : number;
  public id_material : number
  public name : string;
  public fecha : Date;
  public institucion : string;
  public link : string;
  public description : string;

  constructor(id,id_material,name,fecha,institucion, link,description){
    this.id = id;
    this.id_material = id_material;
    this.name = name;
    this.fecha = fecha;
    this.institucion = institucion;
    this.link = link;
    this.description = description;
  }
};
