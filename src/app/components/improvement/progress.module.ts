import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from "ag-grid-angular";
import { SharedModule } from '../shared/shared.module';
import { ActionService } from '../../services/improvement/action.service';
import { ProgressService } from '../../services/improvement/progress.service';
import { ProgressComponent } from './progress.component';

import { DropdownImprovementStatusModule } from '../dropdown/improvement.status/dropdown.improvement.status.module';
import { DropdownPauseReasonModule } from '../dropdown/pause.reason/dropdown.pause.reason.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    AgGridModule.withComponents([]),
    DropdownImprovementStatusModule,
    DropdownPauseReasonModule,
  ],
  declarations: [
    ProgressComponent
  ],
  exports: [ ProgressComponent ],
  providers: [
    ActionService,
    ProgressService,
  ],
   entryComponents: [
  ],     
})
export class ProgressModule { }
