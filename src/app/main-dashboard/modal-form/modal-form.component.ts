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

  constructor(private modalService: NgbModal,private authService: AuthService
              ) { }

  ngOnInit(): void {
  }

  modalOpen(content:any){
    this.modalService.open(content, {size: "sm"}).result.then((result)=>{
      console.log(result);
    }).catch((error)=>{
      console.log(error);
    });
  }

  submit(form: NgForm){
    this.modalService.dismissAll();
    const data = {
      property: this.parameter,
      value: form.value[this.parameter]
    }
    console.log(data);
    this.authService.addDocToCollection(data);

  }

}
