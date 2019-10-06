import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { DropdownImprovementPriorityComponent } from './dropdown.improvement.priority.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgSelectModule
    ],
    declarations: [ DropdownImprovementPriorityComponent ],
    exports: [ DropdownImprovementPriorityComponent ],
  })
  export class DropdownImprovementPriorityModule { }