import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-self-analyse',
  templateUrl: './self-analyse.component.html',
  styleUrls: ['./self-analyse.component.scss']
})
export class SelfAnalyseComponent implements OnInit {

  symptoms =['Fever', 'Tiredness', 'Dry-Cough','Difficulty-in-Breathing', 'Sore-Throat', 'Body-Pains','Nasal-Congestion' ,'Runny-Nose', 'Diarrhea', 'None'];

  age=['0-9','10-19','20-24','25-29','60+'];

  contact=['Yes','No','Dont-know'];
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
  }
}
