import { Component, Inject, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';
import { FetchService } from '../services/fetch.service';
import  *  as  data  from  '../../assets/remedies.json';

@Component({
  selector: 'app-self-analyse',
  templateUrl: './self-analyse.component.html',
  styleUrls: ['./self-analyse.component.scss']
})
export class SelfAnalyseComponent implements OnInit {

  res: any =[];
  //list of symptoms our model is using to predict the severity
  symptoms =['Dry-Cough','Sore-Throat','Weakness','Difficulty-in-Breathing','Drowsiness','Chest-Pain','Travelled to infected countries','Diabetes','Heart-Disease','Lung Disease','Stroke','Have your symptoms progressed?','High Blood Pressure','Kidney-Disease','Change in apetite','Loss of sense of smell'];

  result:any;
  name: any;
  condition: any ="Normal";
  severity: any;
  img: string = "../../assets/normal.png";
  color: any= "green solid 4px";
  data = data;
  
  constructor(private modalService:NgbModal,private dataService: DataService,
    public activeModal: NgbActiveModal,
    private postService: FetchService) { }

  ngOnInit(): void {
    if(localStorage.getItem("severity") != ""){
      this.severity = localStorage.getItem("severity")
      this.severity = JSON.parse(this.severity);
      this.updateData();
      
    }
    this.dataService.getName();
    
    setTimeout(()=>{
      this.name = this.dataService.nameee();
    }, 1000);

  }

  //function responsible for trigering of the modal
  triggerModal(content: any) {
    this.modalService.open(content, {size: "lg", centered:true}).result.then((result)=>{
      console.log(result);
    }).catch((error)=>{
      console.log(error);
    });
  }
  
  //function which executes after form submission and stores user inputs
  submitForm(form: NgForm){
    this.modalService.dismissAll();
    console.log(form.value);
    this.result = form.value;
    this.resolve();
    
  }

  //function to filter user input and covert it into array consisting of 1,0 which are sent to our model
  resolve(){
    this.res =[];
    for(let i=0; i< this.symptoms.length ; i++){
      if(this.result[this.symptoms[i]] == true){
        this.res.push(1);
      }else{
        this.res.push(0);
      }
    }

    this.res = [this.res];
    console.log(this.res);
    this.getResult();
  }

  // function to get response from ML model
  async getResult(){
    await this.postService.fetchPosts(this.res);
    setTimeout(()=>{
      this.severity = this.postService.getPosts();
      console.log(this.severity)
      this.updateData();
    },4000)
    
  }
  
  //function to update the severity according to the response from ML model
  updateData(){
    if(this.severity == "Moderate severity"){
      this.condition = "Moderate";
      this.img = "../../assets/mild.png";
      this.color= "orange solid 4px";
    }else if(this.severity == "Mild severity"){
      this.condition = "Mild";
      this.img = "../../assets/mild2.png";
      this.color= "yellow solid 4px";
    }else if(this.severity == "Severe severity"){
      this.condition = "Severe";
      this.img = "../../assets/severe.png";
      this.color= "red solid 4px";
    }
  }
  
}

