import {
  Component,
  ViewContainerRef,
  OnInit,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { BaseComponent } from "../../base.component";
import { ChannelSector } from "../../../models/channel-sector";
import { ChannelSectorService } from "../../../services/channel-sector/channel-sector.service";

@Component({
  selector: "dropdown-channel-sector",
  templateUrl: "./dropdown.channel-sector.html",
})
export class DropdownChannelSectorComponent
  extends BaseComponent
  implements OnInit {
  @Input() channel_id: number;
  @Output() emitChangeEvent = new EventEmitter();
  items: Array<ChannelSector> = [];

  constructor(
    private channelSectorService: ChannelSectorService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    super();
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.channelSectorService.list(this.channel_id).subscribe(
      (result) => (this.items = result),
      (error) =>
        this.toastr.error(error, "Erro!", {
          enableHTML: true,
          showCloseButton: true,
        })
    );
  }

  public emitChangeValue(value: any) {
    this.emitChangeEvent.emit(value);
  }
}
