import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexYAxis
} from "ng-apexcharts";
import { DataService } from 'src/app/services/data.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  fill: ApexFill;
  markers: ApexMarkers;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  @ViewChild("chart")
  chart!: ChartComponent;
  public chartOptions!: any;

  @Input()
  parameter!: string;

  userInformation_value :any;
  userInformation_date :any;
  userlogs:any ;
  isLoading : boolean= true;

  constructor(private modalService: NgbModal,private authService: AuthService, private dataService: DataService
              ){
                this.update();    
                
                setTimeout(()=>{
                  console.log(this.userlogs.length);
                  this.filterData();
                  this.chartform();

                },2000);      
              }

  ngOnInit(): void {
 
    if(this.userlogs == undefined){
      console.log('im here');
      setTimeout(()=> {
        this.update();
        setTimeout(()=>{
          console.log(this.userlogs.length);
          this.filterData();
          this.chartform();

        },2000);}, 2000);
    }

  };

  //update user data
  async update(){
    await this.dataService.getDocumentsCollection().then((res)=>{
      this.userlogs = res; 
      this.userInformation_date =[];
      this.userInformation_value=[];
    });
  }

  //function for opening the modal when button clicked
  modalOpen(content:any){
    this.modalService.open(content, {size: "sm"}).result.then((result)=>{
      console.log(result);
    }).catch((error)=>{
      console.log(error);
    });
  };

  //function for submitting the user data from modal
  submit(form: NgForm){
    this.modalService.dismissAll();
    const data = {
      property: this.parameter,
      value: form.value[this.parameter],
      date: new Date().toString()
    }
    console.log(data);
    this.dataService.addDocToCollection(data);
    this.userInformation_value.push(Number(data.value));
    this.userInformation_date.push(data.date);
    this.updateChart();

  };

  updateChart(){
    this.chartOptions.series = [{
      data: this.userInformation_value
    }];
  }

  //function for filtering data according to the current parameter
  async filterData(){
    this.userlogs = this.userlogs.sort((i:any,j:any)=> new Date(i.date).getTime() - new Date(j.date).getTime());
    for(let i=0; i<this.userlogs.length; i++){
      if(this.userlogs[i].property == this.parameter){
        this.userInformation_value.push(Number(this.userlogs[i].value));
        this.userInformation_date.push(this.userlogs[i].date);
        
      }
    };
  };

  //function for creating charts 
  chartform(){
    if(this.userInformation_value){
      this.isLoading =false;
    }
    this.chartOptions = {
      series: [
        {
          name: this.parameter,
          data: this.userInformation_value
        }
      ],
      chart: {
        height: 350,
        type: "line",
        background: '#1a1924',
        foreColor: "#ccc",
      },
      stroke: {
        width: 5,
        curve: "smooth"
      },
      tooltip: {
        theme: "dark",
      },
      xaxis: {
        type: "datetime",
        categories: this.userInformation_date
      },
      title: {
        text: this.parameter,
        align: "left",
        
        offsetX: 40,
        style: {
          fontSize: "16px",
          color: "#fff"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#FDD835"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 4,
        colors: ["#FFA41B"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      yaxis: {
        min: 50,
        max: 110,
        title: {
          text: "Value"
        }
      },
      theme: {
        mode: 'dark'
    }
    
    };

  }
}
