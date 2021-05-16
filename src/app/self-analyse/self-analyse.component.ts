import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-self-analyse',
  templateUrl: './self-analyse.component.html',
  styleUrls: ['./self-analyse.component.scss']
})
export class SelfAnalyseComponent implements OnInit {

  closeModal!: string;
  
  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
  }

  triggerModal(content: any) {
    this.modalService.open(content, {size: "dailog-centered"});
  }
  
  private getDismissReason(reason: any) {
    console.log(reason);
  }
}
