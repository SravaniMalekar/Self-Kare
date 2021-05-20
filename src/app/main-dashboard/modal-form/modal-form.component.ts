import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  userInformation_value :Array<any> =[];
  userInformation_date :Array<any> =[];
  userlogs!: any;

  constructor(private modalService: NgbModal,private authService: AuthService
              ){
                this.update();
                setTimeout(()=>{
                  console.log(this.userlogs.length);
                  this.filterData();
                  this.chartform();

                },1000);
                console.log(this.userInformation_date,this.userInformation_value);
                                
              }

  ngOnInit(): void {
    
  };

  //update user data
  async update(){
    await this.authService.getDocumentsCollection().then((res)=>{
      this.userlogs = res;
    });
  }

  //function for opening the modal when button clicked
  modalOpen(content:any){
    this.modalService.open(content, {size: "sm"}).result.then((result)=>{
      console.log(result);
    }).catch((error)=>{
      console.log(error);
    });
    this.filterData();
    this.chartform();
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
    this.authService.addDocToCollection(data);

  };

  //function for filtering data according to the current parameter
  async filterData(){
    for(let i=0; i<this.userlogs.length; i++){
      if(this.userlogs[i].property == this.parameter){
        this.userInformation_value.push(Number(this.userlogs[i].value));
        this.userInformation_date.push(this.userlogs[i].date);
      }
    };
  };

  chartform(){
    this.chartOptions = {
      series: [
        {
          name: this.parameter,
          data: this.userInformation_value
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: 7,
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: this.userInformation_date
      },
      title: {
        text: this.parameter,
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666"
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
      }
    };

  }
}
