import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotouploadService {



  constructor(private http: HttpClient) { }

  ProfileImageUpload(image) {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    sessionStorage.getItem('Employeename');
    let _Details = image
    console.log("imagepath", _Details)
    let options = {
      headers: httpHeaders,
    };

    return this.http.post(environment.apiURL + '/ProfileImageSave', _Details, options)

  }


  GetProfileImage() {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let HttpParams = { 'Email': sessionStorage.getItem('email') }
    let options = {
      headers: httpHeaders,
      params: HttpParams
    };

    return this.http.get(environment.apiURL + '/GetProfileImage', options)

  }


}
