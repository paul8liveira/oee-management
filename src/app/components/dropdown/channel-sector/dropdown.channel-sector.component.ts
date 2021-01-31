import {
  Component,
  ViewContainerRef,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { BaseComponent } from "../../base.component";
import { ChannelSector } from "../../../models/channel-sector";
import { ChannelSectorService } from "../../../services/channel-sector/channel-sector.service";
import { FilterService } from "../../../services/dashboard/filter.service";
import { Subscription } from "rxjs";

@Component({
  selector: "dropdown-channel-sector",
  templateUrl: "./dropdown.channel-sector.html",
})
export class DropdownChannelSectorComponent
  extends BaseComponent
  implements OnInit, OnDestroy {
  @Output() emitChangeEvent = new EventEmitter();
  items: Array<ChannelSector> = [];
  private unsubscribe: Subscription[] = [];
  selectedSector: any;

  constructor(
    private channelSectorService: ChannelSectorService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private filterService: FilterService
  ) {
    super();
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    const subs = this.filterService.onChannelUpdate$.subscribe((channel) =>
      this.load(channel.id)
    );
    this.unsubscribe.push(subs);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((f) => f.unsubscribe());
  }

  load(channelId: number) {
    this.channelSectorService.list(channelId).subscribe(
      (result) => {
        this.items = result;
        this.selectedSector = this.items[0].id;
        this.emitChangeValue(this.items[0]);
      },
      (error) =>
        this.toastr.error(error, "Erro!", {
          enableHTML: true,
          showCloseButton: true,
        })
    );
  }

  public emitChangeValue(value: any) {
    this.selectedSector = value.id;
    this.filterService.setSectorFilter(value.id);
  }
}
