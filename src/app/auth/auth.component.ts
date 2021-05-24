import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  //function to switch from login mode to signup 
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  
  //function which executes after submission of Login/Signup form
  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    console.log(name);

    //calling login/signup methods from authservice
    if(this.isLoginMode){
      this.authService.login(email,password);
    }
    else{
      this.authService.emailSignup(name,email,password);
    }
  }
}
