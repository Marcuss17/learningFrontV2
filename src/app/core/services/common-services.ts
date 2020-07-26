import { Injectable, HostListener } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  baseUrl: string = "https://learningbackend.herokuapp.com";
}
