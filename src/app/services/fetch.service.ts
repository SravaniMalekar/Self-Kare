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

  getPosts(){
    return this.data;
  }
}
