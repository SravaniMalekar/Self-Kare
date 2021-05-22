import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  name: any;
  constructor(private dataService: DataService) { 
    
  }

  ngOnInit(): void {
    
    this.dataService.getName();
    
    setTimeout(()=>{
      this.name = this.dataService.nameee();
    }, 1000);
    
  }
  
  


}
