import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { DropdownPauseReasonComponent } from './dropdown.pause.reason.type.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgSelectModule
    ],
    declarations: [ DropdownPauseReasonComponent ],
    exports: [ DropdownPauseReasonComponent ],
  })
  export class DropdownPauseReasonTypeModule { }