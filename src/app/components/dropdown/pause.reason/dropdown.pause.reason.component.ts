import {
  Component,
  ViewContainerRef,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../../base.component';
import { PauseReasonService } from '../../../services/pause.reason/pause.reason.service';
import { PauseReason } from '../../../models/pause.reason';

@Component({
  selector: 'dropdown-pause-reason',
  templateUrl: './dropdown.pause.reason.html',
})
export class DropdownPauseReasonComponent extends BaseComponent implements OnChanges {
  items: Array<PauseReason> = [];
  @Input() channelId: number;
  @Input() machineCode: string = '';
  @Output() emitChangeEvent = new EventEmitter();

  constructor(
    private pauseReasonService: PauseReasonService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    super();
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnChanges() {
    if(this.channelId && this.machineCode) {
      this.load(this.channelId, this.machineCode);
    }
  }

  load(channelId: number, machineCode: string) {
    this.pauseReasonService.dropdown(channelId, machineCode)
    .subscribe(
      result => {
        this.items = result;
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });
  }

  public emitChangeValue(value: any) {
    this.emitChangeEvent.emit(value);
  }
}
