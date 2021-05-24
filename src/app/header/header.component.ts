import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService) { 
    
  }
  
  ngOnInit(): void {
  }

  //function for calling the signout method from AuthService 
  signOut(){
    this.authService.SignOut();
  }

  
}
