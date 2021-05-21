import { Component, Inject, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FetchService } from '../services/fetch.service';

@Component({
  selector: 'app-self-analyse',
  templateUrl: './self-analyse.component.html',
  styleUrls: ['./self-analyse.component.scss']
})
export class SelfAnalyseComponent implements OnInit {

  res: any =[];
  symptoms =['Dry-Cough','Sore-Throat','Weakness','Difficulty-in-Breathing','Drowsiness','Chest-Pain','Travelled to infected countries','Diabetes','Heart-Disease','Lung Disease','Stroke','Have your symptoms progressed?','High Blood Pressure','Kidney-Disease','Change in apetite','Loss of sense of smell'];

  result:any;

  constructor(private modalService:NgbModal,
    public activeModal: NgbActiveModal,
    private postService: FetchService) { }

  ngOnInit(): void {
  }

  triggerModal(content: any) {
    this.modalService.open(content, {size: "lg", centered:true}).result.then((result)=>{
      console.log(result);
    }).catch((error)=>{
      console.log(error);
    });
  }
  
  submitForm(form: NgForm){
    this.modalService.dismissAll();
    console.log(form.value);
    this.result = form.value;
    this.resolve();
    
  }


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
    this.postService.fetchPosts(this.res);
  }
}

