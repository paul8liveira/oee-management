import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ProductService } from '../../services/product/product.service';
import { ProductComponent } from './product.component';
import { AgGridModule } from 'ag-grid-angular';
import { DropdownMachineModule } from '../dropdown/machine/dropdown.machine.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule,
    FormsModule,
    AngularFontAwesomeModule,   
    DropdownMachineModule 
  ],
  declarations: [ 
    ProductComponent
  ],
  exports: [ 
    ProductComponent
  ],
  providers: [ ProductService ],
  entryComponents: [
  ],  
})
export class ProductModule { }
