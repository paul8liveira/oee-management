import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { DropdownImprovementStatusComponent } from './dropdown.improvement.status.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgSelectModule
    ],
    declarations: [ DropdownImprovementStatusComponent ],
    exports: [ DropdownImprovementStatusComponent ],
  })
  export class DropdownImprovementStatusModule { }