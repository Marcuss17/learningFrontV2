import { Component, OnInit } from '@angular/core';
import { AllFilesService } from "src/app/core/services/files-service";

import { StorageService } from 'src/app/core/services/storage-service';



@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
  providers: [StorageService,AllFilesService]
})
export class FilesComponent implements OnInit {

  private currentFile : any = null;
  public listFiles : File[] = [];

  constructor(
    private storageService: StorageService,
    private filesService : AllFilesService
  ) { }

  ngOnInit(): void {
    this.filesService.getAllFiles(
      Number(this.storageService.getTempFile_Courses())
    ).subscribe(
      response =>{
        console.log(response);
        for (let val in response){
          console.log(response[val]);
          this.listFiles.push( new File(
            response[val].name,
            response[val].type,
            response[val].link,
            response[val].material_from.who_posted.id,
            )
          )
        }
        console.log(this.listFiles);
      }, error => {
        console.log(error);
      }
    )
  }

  downloadMaterial() {

  }

  fileType() {
    if(this.currentFile.type == "PDF") {
      return true;
    }
    return false;
  }

  typeVideo() {
    if(this.currentFile.type == "YOUTUBE_LINK") {
      return true;
    }
    return false;
  }
  
  chooseFile(file) {
    if(this.currentFile !=null){
      this.currentFile.backgroundcolor = '#f6f9fc';
    }
    this.currentFile = file;
    file.backgroundcolor = '#bddbfa';
  }

}

export class File{
  public name : string;
  public type : string;
  public ruta : string;

  constructor(name, type, ruta, id_user){
    
    if(type!='YOUTUBE_LINK'){
      this.ruta = 'http://localhost:8081/'+id_user+'/materiales/'+ruta;
    }
    else{
      this.ruta = ruta;
    }
    this.name = name;
    this.type = type;
  }
};


/*<<<<<<< HEAD
  public archivos: any[] = [
    {
      name: "JSJSJ",
      type: "pdf",
      peso: 123,
      ruta: '/assets/pdfs/pdf1.pdf',
      backgroundcolor : '#f6f9fc'
    },
    {
      name: "JS",
      type: "yt",
      peso: 123,
      ruta: '/assets/pdfs/pdf2.pdf',
      backgroundcolor : '#f6f9fc'
    },
    {
      name: "ll",
      type: "mp4",
      peso: 123, 
      ruta: '/assets/pdfs/pdf3.pdf',
      backgroundcolor : '#f6f9fc'
    }
  ]
=======
  
>>>>>>> 05287435f9aaca8ca0cd3a4438597d17d8d2931a*/
