import { 
  Component, 
  ViewContainerRef, 
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../../base.component';
import { ProductService } from '../../../services/product/product.service';
import { Product } from '../../../models/product';
 
@Component({
  selector: 'dropdown-product',  
  templateUrl: './dropdown.product.html',
})
export class DropdownProductComponent extends BaseComponent implements OnInit {
  @Input() channel_id: number;
  @Input() machine_code: string;
  @Output() emitChangeEvent = new EventEmitter();
  items: Array<Product> = [];

  constructor(
    private productService: ProductService,
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
    this.productService.list(this.channel_id, this.machine_code)
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