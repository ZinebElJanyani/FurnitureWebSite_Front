import { CategoryService } from './../../../services/category.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
declare var $:any
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent  {
  openModelopen(){
    console.log("koko")
    $('#productModal').modal('show')
   
  }
}