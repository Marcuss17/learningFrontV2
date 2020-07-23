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
	setTempTheme_Courses(theme : string){
		localStorage.setItem("course_theme",theme);
	}
	setTempFile_Courses(file : string){
		localStorage.setItem("course_file",file);
	}

	getTempFile_Courses(){
		return localStorage.getItem("course_file");
	}
	
	getTempTheme_Courses(){
		return localStorage.getItem("course_theme");
	}

	getTempoCourse_Courses(){
		return localStorage.getItem("course_course");
	}
	
	getTempoGrade_Courses(){
		return localStorage.getItem("course_grade");
	}

	setPostulantLocalStorage(postulant : string){
		localStorage.setItem("postulant",postulant);
	}

	getPostulantLocalStorage(){
		return localStorage.getItem("postulant");
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

	setUpload(upload: string) {
		localStorage.setItem("upload", upload);
	}

	getUploadLocalStorage() {
		let upload = localStorage.getItem("upload");
		let auxiliar = upload.split(',');
		return Array.from(auxiliar);
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