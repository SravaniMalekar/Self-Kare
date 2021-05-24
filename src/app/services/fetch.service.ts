import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { 
  }
  data: any;

  //function to send a POST Request to ML Model deployed as REST API and get severity response
  fetchPosts(content: Array<any>){
    const postData : Array<any> = content;
    this.http.post('https://covid-severity-webapp.herokuapp.com/',postData,{
      headers: new HttpHeaders({'content-type': 'application/json', 'Accept-Charset': 'UTF-8',}),
      observe: 'body',
      responseType: 'text'
    }).subscribe(responseData =>{
      console.log(responseData);
      this.data = responseData;
      localStorage.setItem("severity",JSON.stringify(responseData));
    })
    return this.data;
  }

  //function to retutn the severity response
  getPosts(){
    return this.data;
  }
}
