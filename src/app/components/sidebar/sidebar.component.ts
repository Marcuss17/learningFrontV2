import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "src/app/core/services/storage-service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Learning Peru",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  { path: "/courses", title: "Cursos", icon: "ni-planet text-blue", class: "" },
  // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
  {
    path: "/user-profile",
    title: "Perfil",
    icon: "ni-single-02 text-yellow",
    class: "",
  },
  // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
  /*{ path: "/login", title: "Login", icon: "ni-key-25 text-info", class: "" },
  {
    path: "/register",
    title: "Registro",
    icon: "ni-circle-08 text-pink",
    class: "",
  },*/
  
  { path: "/mymaterials", 
  title: "Favoritos", 
  icon: "ni-books text-red", 
  class: "" 
},
];

export const aux: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Learning Peru",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  //{ path: "/courses", title: "Cursos", icon: "ni-planet text-blue", class: "" },
  // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
  /*{
    path: "/user-profile",
    title: "Perfil",
    icon: "ni-single-02 text-yellow",
    class: "",
  },*/
  // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: "/login", title: "Login", icon: "ni-key-25 text-info", class: "" },
  {
    path: "/register",
    title: "Registro",
    icon: "ni-circle-08 text-pink",
    class: "",
  }
];



export const ifTWaiting: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Learning Peru",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  { path: "/courses", title: "Cursos", icon: "ni-planet text-blue", class: "" },
  {
    path: "/user-profile",
    title: "Perfil",
    icon: "ni-single-02 text-yellow",
    class: "",
  },
  { path: '/upgrade', title: 'Upgrade',  icon:'ni-bold-up text-red', class: '' },
  { path: "/mymaterials", 
  title: "Favoritos", 
  icon: "ni-books text-red", 
  class: "" 
},
];

export const ifTeacher: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Learning Peru",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  { path: "/courses", title: "Cursos", icon: "ni-planet text-blue", class: "" },
  {
    path: "/user-profile",
    title: "Perfil",
    icon: "ni-single-02 text-yellow",
    class: "",
  },
  { path: '/upgrade', title: 'Upgrade',  icon:'ni-bold-up text-red', class: '' },
  { path: '/materials', title:'Material', icon:'ni ni-archive-2 text-red',class:''},
  { path: "/mymaterials", 
  title: "Favoritos", 
  icon: "ni-books text-red", 
  class: "" 
},
];

export const ifCurator : RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Learning Peru",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  { path: "/courses", title: "Cursos", icon: "ni-planet text-blue", class: "" },
  {
    path: "/user-profile",
    title: "Perfil",
    icon: "ni-single-02 text-yellow",
    class: "",
  },
  { path: '/all_tcurators', title: 'Materiales Curar',  icon:'ni-bold-up text-red', class: '' },
  { path: '/materials', title:'Material', icon:'ni ni-archive-2 text-red',class:''},
  { path: "/mymaterials", 
  title: "Favoritos", 
  icon: "ni-books text-red", 
  class: "" 
},
];

export const ifCwaiting : RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Learning Peru",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  { path: "/courses", title: "Cursos", icon: "ni-planet text-blue", class: "" },
  {
    path: "/user-profile",
    title: "Perfil",
    icon: "ni-single-02 text-yellow",
    class: "",
  },
  { path: '/materials', title:'Material', icon:'ni ni-archive-2 text-red',class:''},
  { path: "/mymaterials", 
  title: "Favoritos", 
  icon: "ni-books text-red", 
  class: "" 
},
];


export const ifAdmin : RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Learning Peru",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  { path: "/courses", title: "Cursos", icon: "ni-planet text-blue", class: "" },
  {
    path: "/user-profile",
    title: "Perfil",
    icon: "ni-single-02 text-yellow",
    class: "",
  },
  { path: '/materials', title:'My material', icon:'ni ni-archive-2 text-red',class:''},
  { path: '/admin', title:'Admin', icon:'ni ni-settings', class:''},
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  providers: [StorageService]
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  public identity: any;

  constructor(
    private router: Router,
    private storageService: StorageService
    ) {
  }

  ngOnInit() {
    if(this.storageService.getIdentityLocalStorage()){
      this.identity = JSON.parse(this.storageService.getIdentityLocalStorage());
    }

    if(!this.storageService.getIdentityLocalStorage()){
      this.menuItems = aux.filter((menuItem) => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
      });

    } else{
      if(this.identity.role == "TWAITING"){
        this.menuItems = ifTWaiting.filter((menuItem) => menuItem);
        this.router.events.subscribe((event) => {
          this.isCollapsed = true;
        });
      } else {
        if(this.identity.role == "TEACHER"){
          this.menuItems = ifTeacher.filter((menuItem) => menuItem);
          this.router.events.subscribe((event) => {
            this.isCollapsed = true;
          });
        }else{
          if(this.identity.role == "CURATOR"){
            this.menuItems = ifCurator.filter((menuItem) => menuItem);
            this.router.events.subscribe((event) => {
              this.isCollapsed = true;
            });
          }else{ 
            if(this.identity.role == "ADMIN"){
              this.menuItems = ifAdmin.filter((menuItem) => menuItem);
              this.router.events.subscribe((event) => {
                this.isCollapsed = true;
              });
            }else{ 
              if(this.identity.role == "CWAITING"){
                this.menuItems = ifCwaiting.filter((menuItem) => menuItem);
                this.router.events.subscribe((event) => {
                  this.isCollapsed = true;
                });
              }
              else{
              this.menuItems = ROUTES.filter((menuItem) => menuItem);
              this.router.events.subscribe((event) => {
                this.isCollapsed = true;
              
            });
          }
          }
        
        }
        } 
      }
    }
  }
}
