import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }

  fetchPosts(content: Array<any>){
    const postData : Array<any> = content;
    this.http.post('https://covid-severity-webapp.herokuapp.com/',postData,{
      headers: new HttpHeaders({'content-type': 'application/json', 'Accept-Charset': 'UTF-8',}),
      observe: 'body',
      responseType: 'text'
    }).subscribe(responseData =>{
      console.log(responseData);
    })
  }
}
