import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage-service';
import { AdminService } from 'src/app/core/services/admin-service';
import { currentUpload } from '../materials/materials.component';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-postulant_curator',
  templateUrl: './postulant_curator.component.html',
  styleUrls: ['./postulant_curator.component.css'],
  providers: [StorageService, AdminService]
 
})
export class PostulantCurator implements OnInit {



    private currentFile : any = null;
    public currentPostulant : any;
    public currentIdentity : any;
    public currentPostulantFile : any;

    constructor(
      private storageService: StorageService,
      private adminService : AdminService,
      private router: Router,
    ) { }
  
    ngOnInit(): void {      
      this.currentPostulantFile = (JSON.parse(this.storageService.getPostulantLocalStorage()));
      this.currentIdentity = (JSON.parse(this.storageService.getIdentityLocalStorage()));
      this.adminService.getPostulant(this.currentPostulantFile.id).subscribe(
        response=>{
          console.log(response);
      
          this.currentPostulant = new InformationPostulant(
            response.id,
            response.username,
            response.name,
            response.lastname,
            this.currentPostulantFile.date,
            response.especialidad,
            response.myMaterials.length,
            response.institucion,
            this.currentPostulantFile.link,
          )
          console.log("ACAAAAAAAA ESTAAAAAAAAAAAAAAAAA");
          console.log(this.currentPostulant);
        },
        error=>{
          console.log(error);
        }
      )

    }
  
    
    AceptarCurator(){
      Swal.fire({
        title: 'Usted aceptara a esta persona como curator',
        text: "No podra cambiar esta accion",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Acaba de aceptar como',
            'curator a este usuario',
            'success'
          )
          this.adminService.acceptCurator(
             Number(this.currentPostulantFile.id),
             Number(this.currentIdentity.id),
             Number(this.currentPostulantFile.id_material),
            ).subscribe(
            response=>{
              console.log(response);
              this.router.navigateByUrl("/admin");

            }
          )
  
        }
      })
  
    }
  
    DenegarCurator(){
  
      Swal.fire({
        title: 'Usted no aceptar a este postulante',
        text: "No podra cambiar esta accion",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Denegar'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Acaba de denegar como',
            'curator a este usuario',
            'success'
          )
          this.adminService.negateCurator(
             Number(this.currentPostulantFile.id),
             Number(this.currentIdentity.id),
             Number(this.currentPostulantFile.id_material),
            ).subscribe(
            response=>{
              console.log(response);
              this.router.navigateByUrl("/admin");

            }
          )
  
        }
      })

    }
      
  }

  export class InformationPostulant {
    public id : number;
    public username : string;
    public lastname : string;
    public name : string;
    public fecha : Date;
    public especialidad : string;
    public cantidadMateriales : number;
    public institucion : string;
    public linkMaterial : string;
  
    constructor(id,username,lastname,name,fecha,especialidad,cantidadMateriales,institucion,linkMaterial){
      this.id = id;
      this.username = username;
      this.name = name;
      this.lastname = lastname;
      this.fecha = fecha;
      this.especialidad = especialidad;
      this.cantidadMateriales = cantidadMateriales;
      this.institucion = institucion;
      this.linkMaterial = "http://localhost:8081/uploads/download/"+this.id+"/upgrade_files/"+linkMaterial;
    }
  };







