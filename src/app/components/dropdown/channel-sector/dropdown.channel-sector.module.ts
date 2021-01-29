import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownChannelSectorComponent } from './dropdown.channel-sector.component';
import { ChannelSectorService } from '../../../services/channel-sector/channel-sector.service';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgSelectModule
    ],
    declarations: [
      DropdownChannelSectorComponent
    ],
    exports: [
      DropdownChannelSectorComponent
    ],
    providers: [ChannelSectorService],
  })
  export class DropdownChannelSectorModule { }
