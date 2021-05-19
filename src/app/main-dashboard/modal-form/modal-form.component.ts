import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {

  @Input()
  parameter!: string;

  userlogs:any;
  userInformation :Array<any> =[];

  constructor(private modalService: NgbModal,private authService: AuthService
              ) { }

  ngOnInit(): void {
    this.authService.getDocumentsCollection().then((res)=>{
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
    
  }

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

  }

  //function for filtering data according to the current parameter
  filterData(){
    this.userlogs.forEach((doc: { property: string; })=>{
      if(doc.property == this.parameter){
        this.userInformation.push(doc);
      }
    })
    console.log(this.userInformation);
  }
}
