import {
  Component,
  ViewContainerRef,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { MachineService } from '../../../services/machine/machine.service';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'dropdown-machine-no-group',
  templateUrl: './dropdown-machine-no-group.html',
})
export class DropdownMachineNoGroupComponent extends BaseComponent implements OnInit {
  @Input() channel_id: number;
  @Output() emitChangeEvent: EventEmitter<string> = new EventEmitter();
  @Output() emitList: EventEmitter<any> = new EventEmitter();

  items: Array<any> = [];
  selectedMachineCode: any;

  constructor(
    private machineService: MachineService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
  ) {
    super();
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.load(this.channel_id);
  }

  private load(channelId: number) {
    this.machineService.list(this.getCurrentUser().id, channelId)
    .subscribe(
      result => {
        this.items = result;
        if(this.items.length > 0) {
          this.selectedMachineCode = this.items[0].code;
          this.refreshValue(this.items[0]);
        }
        this.emitList.emit(result);
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });
  }

  public refreshValue(value:any) {
    this.selectedMachineCode = value.code;
    this.emitChangeEvent.emit(value.code);
  }

  public get getItems() {
    return this.items;
  }
}
