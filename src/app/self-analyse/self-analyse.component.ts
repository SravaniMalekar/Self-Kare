import { Component, Inject, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-self-analyse',
  templateUrl: './self-analyse.component.html',
  styleUrls: ['./self-analyse.component.scss']
})
export class SelfAnalyseComponent implements OnInit {

  res: any =[];
  symptoms =['Fever', 'Tiredness', 'Dry-Cough','Difficulty-in-Breathing', 'Sore-Throat', 'Body-Pains','Nasal-Congestion' ,'Runny-Nose', 'Diarrhea', 'None'];

  age=['0-9','10-19','20-24','25-29','60+'];

  contact=['Yes','No','Dont-know'];
  result:any;

  constructor(private modalService:NgbModal,
    public activeModal: NgbActiveModal) { }

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
    // if(this.result[this.symptoms[0]] == true){
    //   console.log('1');
    // }
    this.resolve();
    
  }


  resolve(){
    for(let i=0; i< this.symptoms.length ; i++){
      if(this.result[this.symptoms[i]] == true){
        this.res.push(1);
      }else{
        this.res.push(0);
      }
    }

    for(let j=0;j< this.age.length; j++){
      if(this.result['age']== this.age[j]){
        this.res.push(1);
      }else{
        this.res.push(0);
      }
    }

    for(let k=0;k< this.contact.length; k++){
      if(this.result['contact']== this.contact[k]){
        this.res.push(1);
      }else{
        this.res.push(0);
      }
    }

    this.res = [this.res];
    console.log(this.res);
  }
}

