import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownProductComponent } from './dropdown.product.component';
import { SponsorService } from '../../../services/sponsor/sponsor.service';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgSelectModule
    ],
    declarations: [ 
      DropdownProductComponent
    ],
    exports: [ 
      DropdownProductComponent
    ],
    providers: [SponsorService],
  })
  export class DropdownProductModule { }