import { NgModule } from '@angular/core';
import{MatIcon, MatIconModule} from '@angular/material/icon'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const material = [
  MatIconModule,
  NgbModule
 
]

@NgModule({
 
  imports: [
    material
  ],
  exports:[
    material
  ]
})
export class MaterialModule { }
