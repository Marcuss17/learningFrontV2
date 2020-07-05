import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

	//SessionStorage
	setComingFromLogin(login: string){
		sessionStorage.setItem("login", login);
	}

	setComingFromReg(reg: string){
		sessionStorage.setItem("reg", reg);
	}

	getComingFromLogin(){
		sessionStorage.getItem("login");
	}

	getComingFromReg(){
		sessionStorage.getItem("reg");
	}

	//localStorage

	setTempCourse_Courses(course : string){
		localStorage.setItem("course_course", course);
	}
	setTempGrade_Courses(grade : string){
		localStorage.setItem("course_grade", grade );
	}
	
	getTempoCourse_Courses(){
		return localStorage.getItem("course_course");
	}
	
	getTempoGrade_Courses(){
		return localStorage.getItem("course_grade");
	}

	setIdentityLocalStorage(identity: string){
		localStorage.setItem("identity", identity);
	}

	setCoursesLocalStorage(courses: string) {
		localStorage.setItem("courses", courses);
	}

	setGradesLocalStorage() {
		let s = [1,2,3,4,5];
		localStorage.setItem("grades", s.toString());
	}

	getGradesLocalStorage() {
		let grades = localStorage.getItem("grades");
		let auxiliar = grades.split(',');
		return Array.from(auxiliar);
	}

	getCoursesLocalStorage() {
		let courses = localStorage.getItem("courses");
		let auxiliar = courses.split(',');
		return Array.from(auxiliar);
	}

	getIdentityLocalStorage(){
		return localStorage.getItem("identity");
	}

	removeIdentityLocalStorage(){
		localStorage.removeItem("identity");
	}
}