import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from "ag-grid-angular";
import { SharedModule } from '../shared/shared.module';
import { ResumeService } from '../../services/improvement/resume.service';
import { ResumeComponent } from './resume.component';
import { DropdownImprovementStatusModule } from '../dropdown/improvement.status/dropdown.improvement.status.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ResumeModalComponent } from './modal/resume.modal.component';
import { ResumeImprovementGridButtonRenderer } from './grid/resume.grid.buttons.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    AgGridModule.withComponents([ ResumeImprovementGridButtonRenderer ]),
    DropdownImprovementStatusModule,
    ModalModule.forRoot(),
    AngularFontAwesomeModule,
  ],
  declarations: [
    ResumeComponent,
    ResumeModalComponent,
    ResumeImprovementGridButtonRenderer,
  ],
  exports: [ 
    ResumeComponent,
   ],
  providers: [
    ResumeService,
  ],
   entryComponents: [
    ResumeModalComponent,
  ],     
})
export class ResumeModule { }
