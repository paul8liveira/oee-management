import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr';
import { DashboardService } from "../../services/dashboard/dashboard.service";
import { MachineProductDash } from "../../models/machine.product.dash";

@Component({
    selector: 'modal-product',
    templateUrl: './product.modal.component.html'
  })
   
  export class ProductModalComponent implements OnInit {
    products: Array<MachineProductDash> = [];
    title: string;
    channelId: number;
    machineCode: string;
    amount: string;
   
    constructor(
      public bsModalRef: BsModalRef,
      public toastr: ToastsManager,
      vcr: ViewContainerRef,
      private dashboardService: DashboardService) {
        this.toastr.setRootViewContainerRef(vcr);         
    }
   
    ngOnInit() {
    }

    confirm() {
      this.bsModalRef.hide();

      this.products.forEach(f => {
        f.amount = this.amount;
      });

      this.dashboardService.addProduct(this.products)
      .subscribe(
        result => {                 
        },
        error => {
          this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
        }
      );
    }

    setProduct($event) {
      this.products.forEach(f => {
        f.product_id = $event.id;
      });
    }
  }