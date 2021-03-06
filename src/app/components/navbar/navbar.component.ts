import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [StorageService]
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public is_logged: boolean;
  public identity: any;
  public username: String;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private storageService: StorageService
    ) {
    this.location = location;
  }



  ngOnInit() {

    this.listTitles = ROUTES.filter(listTitle => listTitle);
    if(this.storageService.getIdentityLocalStorage()){
      this.identity = JSON.parse(this.storageService.getIdentityLocalStorage());
      this.is_logged=true;
      this.username = this.identity.username; 
    } else {
      this.is_logged=false;
      this.router.navigateByUrl("/dashboard");
    }

  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  logOut(){
    this.storageService.removeIdentityLocalStorage();
    location.reload();
  }

}
