import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage-service';
import { MaterialServices } from 'src/app/core/services/material-service';
import { FilterPipe } from 'ngx-filter-pipe';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css'],
  providers: [StorageService, MaterialServices ]
})
// materiales esta en local storage
export class MaterialsComponent implements OnInit {

  public contador = 0;

  public box1 = false;
  public box2 = false;
  public box3 = false;
  public box4 = false;
  public box5 = false;
  public yt1 = false;
  public yt2 = false;
  public yt3 = false;
  public yt4 = false;
  public yt5 = false;
  public p1 = false;
  public p2 = false;
  public p3 = false;
  public p4 = false;
  public p5 = false;
  private uploadedFiles : any = [];
  private currentupload : currentUpload = new currentUpload();
  public ll : yt; 
  private identity: any;
  private myMaterials : SingleMaterial[] = [];
  private Grades : string[] = ['1er grado','2do grado','3er grado','4to grado','5to grado'];
  private currentTema : any;
  private url:string;

  private toUpload : boolean = false;
  public curar_button : boolean = true;
  public actualizar : boolean;
  public temporal_resolve : any;
  public tempora_theme : any;

  
  
  constructor(
    private storageService: StorageService,
    private filterPipe: FilterPipe,
    private router: Router,
    private materialService: MaterialServices,

  ) { 
    this.ll = new yt();
  }

  

  mostrar_datos(results){
    console.log(results);
    results = results.value;
    this.temporal_resolve = results;
    console.log(results[0],results[1],results[2]);
    this.materialService.sendTemasdata(
      this.storageService.getCoursesLocalStorage()[results[2]],
      Number(results[3])+1
    ).subscribe(
      async response =>{
        this.currentTema = response; 
        console.log();
        const { value: Material } = await Swal.fire({
          title: 'Selecciona uno de los cursos',
          input: 'select',
          inputOptions: this.currentTema,
          showCancelButton: true,
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value != null) {
                resolve()
              } else {
                resolve('Necesita elegir uno de los temas ')
              }
            })
          }
        })
        if (Material) {
          let valor = `${Material}`;
          this.materialService.createMaterial(
            this.identity.id,
            this.temporal_resolve[0],
            this.temporal_resolve[1],
            this.storageService.getCoursesLocalStorage()[results[2]],
            (Number(this.temporal_resolve[3])+1),
            this.currentTema[Number(valor)],
          ).subscribe(
            response =>{
              Swal.fire(`Creaste un material exitosamente`);
              console.log("ESTO ES EL RESPONSE");
              console.log(response);
              this.toUpload = true;
              const identity = {
                id: response.id,
                name: response.name,
                lastname: response.lastname,
                email: response.email,
                username: response.username,
                role: response.type,
                grade: response.grade,
                birth: moment(response.birth).format('DD/MM/YYYY'),
                institucion: response.institucion,
                especialidad: response.especialidad,
                myMaterials: response.myMaterials,
                favouriteMaterials: response.favouriteMaterials,
              }
              console.log(response);
              this.currentupload.constru(this.temporal_resolve[0], response.myMaterials[0].course.grade,response.myMaterials[0].id, this.temporal_resolve[1], this.storageService.getCoursesLocalStorage()[results[2]],this.currentTema[Number(valor)]);
              this.storageService.setIdentityLocalStorage(JSON.stringify(identity));
            },
            (error) => {
              Swal.fire(`Error al crear el material`);
            }
          )
        }
      }
    )
  }
  Uploaded() {
    return this.toUpload;
  }
 
  MandarCurar(currentMaterial){
    Swal.fire({
      title: 'Usted enviara a curar el material',
      text: "No podra modificarlo en el proceso de curado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Enviarlo'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Su material esta',
          'en cola de curacion',
          'success'
        )
        currentMaterial.thisCurarButtom = false;
        this.materialService.sendToCurar(currentMaterial.id, 1).subscribe(
          response=>{
            currentMaterial.status = "Pendiente";
            currentMaterial.color_curated = "badge badge-pill badge-danger";

            
          }
        )

      }
    })

  }

  MandarEliminar(currentMaterial){
    Swal.fire({
      title: '¿Esta seguro de eliminar el material?',
      text: "Esta accion es permanente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado!',
          'Tu materia ha sido eliminado.',
          'success'
        )
        this.materialService.sendToDelete(
          currentMaterial.id,
          3
        ).subscribe(
          response=>{
            if(response){
              const identity = {
                id: this.identity.id,

                name: this.identity.name,
                lastname: this.identity.lastname,
                email: this.identity.email,
                username: this.identity.username,
                role: this.identity.role,
                grade: this.identity.grade,
                birth: moment(this.identity.birth).format('DD/MM/YYYY'),
                institucion: this.identity.institucion,
                especialidad: this.identity.especialidad,
                myMaterials: response.myMaterials,
                favouriteMaterials: response.favouriteMaterials,
              }
              this.storageService.setIdentityLocalStorage(JSON.stringify(identity));
              this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/materials']);
              });               
            }
          }
        )
      }
    })

  }

  getCurarButton(material){
    return material.thisCurarButtom;
  }

  ActualizarMaterial(currentMaterial){
    this.actualizar = false;
    this.toUpload = true;
    this.currentupload.constru(currentMaterial.name, currentMaterial.grade, currentMaterial.id, currentMaterial.desc, currentMaterial.cur, currentMaterial.tem);
  }

  IrMaterial(currentMaterial){
    this.storageService.setTempFile_Courses(currentMaterial.id);
    this.router.navigateByUrl("/files");
  }

  async CreateMaterial(){
    this.actualizar = true;
     Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3','4']

    }).queue([
      {
        title: 'Nuevo Material',
        text: 'Escriba el titulo del material.'
      },
      {
        title: 'Descripcion Material',
        text: 'Escriba una descripcion del material.'
      },
      {
        title: 'Curso',
        input : 'select',
        inputOptions : this.storageService.getCoursesLocalStorage(), 
      },
      {
        title: 'Grado',
        input: 'select',
        inputOptions : this.Grades,
      }
    ]).then((result) => {
      if (result) {
        this.mostrar_datos(result);
      }
      else{
        Swal.fire({
          title: 'No creado Satisfactoriamente',
          confirmButtonText: 'Ir al material!',
          
        })
      }
    })
  }


  public userFilter: any = {
    name: "",
  };

  ngOnInit(): void {
    this.identity = JSON.parse(this.storageService.getIdentityLocalStorage());
    this.materialService.getMyMaterials(this.identity.id).subscribe(
      response=>{
        if(response){
          for(let val of response){
            console.log(val);
            if(val.status!=3 && val.status !=4){
            this.myMaterials.push(
              new SingleMaterial(
                val.id,
                val.name,
                val.course.grade,
                this.Status(val.status),
                this.whoAproved(val.whoApproved),
                val.visits,
                this.getLearningPoints(val.learningPoints,val.ratingPeople),
                val.ratingPeople,
                val.description,
                val.course.name,
                val.course.theme,
              
              )
            )
          }
          }
          
        }
      }
    )  
    
  }



  Status(status){
    if(status == 0){
      return "Creado";
    }
    else if(status == 1 ){
      return "Pendiente";
    }
    else if(status == 2){
      return "Curado";
    }
    
  }
  whoAproved(who_aproved){
    console.log("Aca estamos ");
    console.log(who_aproved);
    if(who_aproved == null){
      return "------";
    }
    
    return who_aproved.username;
  }
  getLearningPoints(learningPoints,ratingPeople){
    if(learningPoints == 0){
      return "0";
    }
    else{
      return ((learningPoints/ratingPeople).toFixed(2));
    }
  }

  upload() {
    let a = true;
    let b = true;
    for (let material of this.uploadedFiles) {
      const formData = new FormData();
      formData.append("file",material);
      console.log("sadsdasd");
      console.log(formData);
      this.materialService.sendFile(this.identity.id, formData).subscribe(
        response=>{
          if(response) {
              this.materialService.createFile(
              this.currentupload.id,
              this.currentupload.titulo,
              response.url.slice(69,(response.url.length)),
              material.type
            ).subscribe(
              response=> {
                if(response == true) {
                  console.log("se creo correctamente :D");
                }
              }
            )
          } else {
            a = false;
            Swal.fire({
              allowOutsideClick: false,
              text: 'Hubo un error al subir el archivo',
              icon: 'error',
            })
          }
        }, error => {
          console.log(error);
        }
      )
    }
    for(let i = 0; i < 5; i++) {
      let a = this.ll.get_link(i+1);
      if(a != "") {
        this.materialService.createFile(
        this.currentupload.id,
        this.currentupload.titulo,
        a,
        "yt"
      ).subscribe(
        response=> {
          if(response == true) {
            console.log("se creo correctamente :D");
          } else {
            b = false;
          }
        })
      }
    }
    if(a && b) {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/materials']);
      }); 
    }
  }


  aumentar(file) {
    let newfile = file.target.files[0];
    this.contador += 1;
    console.log(newfile.type);
    console.log(newfile.name);
    if(newfile.type == "application/pdf") {
      console.log("JJJJ");
    }
    this.uploadedFiles.push(newfile);
  }
 
  rise() {
    this.contador += 1;
  }

  
  
  select1() {
    return this.box1;
  }
  change1() {
    this.box1 = !this.box1;
    this.p1 = !this.p1;
  }
  change1_2() {
    this.box1 = !this.box1;
    this.yt1 = !this.yt1;
  }
  select1_2() {
    return this.box1 && this.yt1;
  }
  ss1() {
    return this.box1 && this.p1;
  }



  select2() {
    return this.box2;
  }
  select2_2() {
    return this.box2 && this.yt2;
  }
  change2() {
    this.box2 = !this.box2;
    this.p2 = !this.p2;
  }
  change2_2() {
    this.box2 = !this.box2;
    this.yt2 = !this.yt2;
  }
  ss2() {
    return this.box2 && this.p2;
  }



  select3() {
    return this.box3;
  }
  select3_2() {
    return this.box3 && this.yt3;
  }
  change3() {
    this.box3 = !this.box3;
    this.p3 = !this.p3;
  }
  change3_2() {
    this.box3 = !this.box3;
    this.yt3 = !this.yt3;
  }
  ss3() {
    return this.box3 && this.p3;
  }



  select4() {
    return this.box4;
  }
  select4_2() {
    return this.box4 && this.yt4;
  }
  change4() {
    this.box4 = !this.box4;
    this.p4 = !this.p4;
  }
  change4_2() {
    this.box4 = !this.box4;
    this.yt4 = !this.yt4;
  }
  ss4() {
    return this.box4 && this.p4;
  }



  select5() {
    return this.box5;
  }
  select5_2() {
    return this.box5 && this.yt5;
  }
  change5() {
    this.box5 = !this.box5;
    this.p5 = !this.p5;
  }
  change5_2() {
    this.box5 = !this.box5;
    this.yt5 = !this.yt5;
  }
  ss5() {
    return this.box5 && this.p5;
  }


  secondDiv() {
    if(this.contador >=1) {
      return true;
    } 
    return false;
  }

  thirdDiv() {
    if(this.contador >=2) {
      return true;
    } 
    return false;
  }

  fouthDiv() {
    if(this.contador >=3) {
      return true;
    } 
    return false;
  }

  fifthDiv() {
    if(this.contador >=4) {
      return true;
    } 
    return false;
  }



}

export class SingleMaterial {
  public id : number;
  public name : string;
  public status : string;
  public curated_by : string;
  public views : string;
  public learning_points : string;
  public porcentaje_LP : string;
  public temporal : number;
  public color_curated : string;
  public color_bar : string;
  public ratingPeople : number;
  public thisCurarButtom : boolean;
  public desc : string;
  public cur : string;
  public tem : string
  public grade : string;

  constructor(id,name,grade,status,curated_by,views,learning_points,ratingPeople, description, curso, tema){
    this.id = id;
    this.name = name;
    this.grade = grade;
    this.status = status;
    this.curated_by = curated_by;
    this.views = views;
    this.learning_points = learning_points;
    this.temporal = learning_points;
    this.color_curated = this.getColorCurated(status);
    this.ratingPeople = ratingPeople;
    this.desc = description;
    this.cur = curso;
    this.tem = tema;

    if(this.status=="Creado"){
      this.thisCurarButtom = true;
    }
    else{
      this.thisCurarButtom = false;
    }
    
  }

  getColorCurated(status){
    if(status == "Pendiente"){
      return "badge badge-pill badge-danger";
    }
    else if(status == "Curado")
      return "badge badge-pill badge-success";
    
    else if(status == "Creado")
      return "badge badge-pill badge-dark";
  }  

  
};

export class currentUpload {
  public titulo : string;
  public id : number;
  public grade : string;
  public descripcion : string;
  public curso : string;
  public tema : string;

  constructor() {}

  constru(tit, grade, i, desc, cur, tem) {
    this.titulo = tit;
    this.id = i;
    this.grade = grade+" ª grado";
    this.descripcion = desc;
    this.curso = cur;
    this.tema = tem;
  }
};

export class yt {
  public link1 : string = "";
  public link2 : string = "";
  public link3 : string = "";
  public link4 : string = "";
  public link5 : string = "";
  constructor(){}
  /**
   * get_link
   */
  public get_link(indice) {
    if(indice == 1) {
      return this.link1;
    }
    if(indice == 2) {
      return this.link2;
    }
    if(indice == 3) {
      return this.link3;
    }
    if(indice == 4) {
      return this.link4;
    }
    return this.link5;
  }
}