import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage-service';
import { FilterPipe } from 'ngx-filter-pipe';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css'],
  providers: [StorageService]
})
export class MaterialsComponent implements OnInit {
  private identity: any;
  private myMaterials : SingleMaterial[] = [];
  //private Cursos : Curso[] = [new Curso('fisica'), new Curso('religion')];
  private Cursos : string[] = ['fisica','matematica'];
  private Grades : string[] = ['1er grado','2do grado','3er grado'];
  private Temas : string[] = ['arimetica','geometria'];
  private Temas2 : string[] = ['oraciones','teoria'];
  private currentTema : any;
  
  constructor(
    private storageService: StorageService,
    private filterPipe: FilterPipe,
    private router: Router,

  ) { 
    
  }
  async mostrar_datos(results){
    results = results.value;
    console.log(results[0],results[1],results[2]);
    
    if(results[1] == 0) {this.currentTema = this.Temas;}
    if(results[1] == 1) {this.currentTema = this.Temas2;}
    console.log(this.currentTema);

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
            resolve('Necesita elegir uno de los temas')
          }
        })
      }
    })
    if (Material) {
      Swal.fire(`Creaste un material exitosamente`);
      this.router.navigateByUrl("/upload");
    }

  }
 

  CreateMaterial(){

    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']

    }).queue([
      {
        title: 'Nuevo Material',
        text: 'Escriba el titulo del material.'
      },
      {
        title: 'Curso',
        input : 'select',
        inputOptions : this.Cursos,
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
    for (let val of this.identity.myMaterials){
      console.log(val);
      this.myMaterials.push(
        new SingleMaterial(
          val.course.theme,
          this.ifAproved(val.who_aproved),
          this.whoAproved(val.who_aproved),
          val.visits,
          this.getLearningPoints(val.learning_points,val.ratingPeople),
          val.ratingPeople
          )
      );
      console.log(this.identity);
    }
    
    console.log("estamos en materials");
    
  }
  ifAproved(who_aproved){
    if(who_aproved == null){
      return "Pendiente";
    }
    return "Curado";
  }
  whoAproved(who_aproved){
    if(who_aproved == null){
      return "------";
    }
    return who_aproved.username;
  }
  getLearningPoints(learning_points,ratingPeople){
    if(learning_points == null){
      return "4";
    }
    else{
      return learning_points/ratingPeople;
    }
  }
}

export class SingleMaterial {

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

  constructor(name,status,curated_by,views,learning_points,ratingPeople){
    this.name = name;
    this.status = status;
    this.curated_by = curated_by;
    this.views = views;
    this.learning_points = learning_points;
    this.temporal = learning_points*2;
    this.porcentaje_LP = this.temporal.toString() + '%';
    this.color_curated = this.getColorCurated(status);
    this.color_bar = this.getColorBar(this.temporal);
    this.ratingPeople = ratingPeople;
    console.log(this.temporal);
  }
  getColorBar(temporal){
    if(temporal>=0 && temporal <50){
      return "progress-bar bg-danger";
    }
    else if(temporal>=50 && temporal<=100){
      return "progress-bar bg-success";
    }
  }

  getColorCurated(status){
    if(status == "Pendiente"){
      return "badge badge-pill badge-danger";
    }
    return "badge badge-pill badge-success";
  }  
};