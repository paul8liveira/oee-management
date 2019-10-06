import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from "ag-grid-angular";
import { SharedModule } from '../shared/shared.module';

import { PauseReasonService } from '../../services/pause.reason/pause.reason.service';
import { PauseReasonComponent } from './pause.reason.component';
import { DropdownPauseReasonModule } from '../dropdown/pause.reason/dropdown.pause.reason.module';
import { DropdownStatusModule } from '../dropdown/status/dropdown.status.module';
import { DropdownPauseReasonTypeModule } from '../dropdown/pause.reason.type/dropdown.pause.reason.type.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AgGridModule,
    DropdownPauseReasonModule,
    DropdownStatusModule,
    DropdownPauseReasonTypeModule,
    AgGridModule.withComponents([]),
  ],
  declarations: [
    PauseReasonComponent,
  ],
  exports: [ PauseReasonComponent ],
  providers: [
    PauseReasonService,
  ],
   entryComponents: [
  ],     
})
export class PauseReasonModule { }
