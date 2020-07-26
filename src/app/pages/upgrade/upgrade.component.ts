import { Component, OnInit } from '@angular/core';
import { UpgradeServices } from "src/app/core/services/upgrade";
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { StorageService } from "src/app/core/services/storage-service";
import { MaterialServices } from 'src/app/core/services/material-service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss'],
  providers: [StorageService]
})
export class UpgradeComponent implements OnInit {
  private uploadFile;
  private identity: any;
  public isWaiting: boolean = false;
  public ll : yt;

  constructor(private upgradeServices: UpgradeServices, 
              private storageService: StorageService, 
              private router: Router,
              private materialService: MaterialServices) { 
                this.ll = new yt();
              }

  ngOnInit() {
    this.identity = JSON.parse(this.storageService.getIdentityLocalStorage());
    if(this.identity.waiting === "isWaiting"){
      this.isWaiting = true;
    }
  }

  fileChange(file){
    this.uploadFile = file.target.files[0];
    console.log("These are the files uploaded: ",this.uploadFile);
  }


  //id_user - description - 


  sendFile(){
    const formData = new FormData();
    let des = true;
    formData.append("file",this.uploadFile);
    console.log(formData);
    this.upgradeServices.sendUpgradeFile(formData, this.identity.id).subscribe(
      response => {
        console.log("ESTA ES LA RESPUESTA: ",response);
        if(response){
          /*Swal.fire({
            title: 'Subiendo archivo',
          })*/
          des = true;
          this.identity.waiting = "isWaiting";
          this.storageService.setIdentityLocalStorage(JSON.stringify(this.identity));
          console.log("SIZE: ", response.url.length);
          this.upgradeServices.createFile(this.identity.id, this.ll.link,response.url.slice(71,(response.url.length))).subscribe(
            response => {
              if(response == true) {
                console.log("se subio bien :D");
                this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/courses']);
                }); 
              } else {
                console.log("no se subio bien D:");
              }
            }, error => {
              console.log(error);
            }
          );


        } else {
          Swal.fire({
            allowOutsideClick: false,
            text: 'Hubo un error al subir el archivo',
            icon: 'error',
          });
        }
      } , error => {
        console.log(error);
      }
    )

  }
}

export class yt {
  public link : string = "";
  constructor(){}
}