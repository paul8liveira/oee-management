import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../base.component';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends BaseComponent implements OnInit {
  product: Product;
  gridApi;
  gridColumnApi;
  columnDefs;
  components;
  paginationPageSize = 10;
  rowSelection = "multiple";
  editType = "fullRow";
  context;
  frameworkComponents;   
  private channel_id: number;
  public machinelist: any = [];

  constructor(private productService: ProductService, 
              public toastr: ToastsManager, 
              public vcr: ViewContainerRef) {
    super();                

    this.channel_id = parseInt(localStorage.getItem('channelId'));
    this.product = new Product(this.channel_id);

    this.toastr.setRootViewContainerRef(vcr);     
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.list();    
  }

  list() {
    this.productService.list(this.channel_id) 
    .subscribe(
      result => {
        this.gridApi.setRowData(result);
        this.gridApi.sizeColumnsToFit();
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });     
  }

  onCellValueChanged(event) {
    this.update(event.data);
  } 

  add(event) {
    event.preventDefault();    
    this.productService.add(this.product) 
    .subscribe(
      result => {
        this.gridApi.updateRowData({ add: [result] });
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }
    );
    this.product = new Product(this.channel_id);
  }

  update(data) {
    this.productService.update(data)
    .subscribe(
      result => {},
      error => this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true })
    );    
  }

  delete() {
    let selectedData = this.gridApi.getSelectedRows();  
    
    if(selectedData.length > 0) {
      selectedData.forEach(row => {

        this.productService.delete(row)
        .subscribe(
          result => {
            this.gridApi.updateRowData({ remove: [row] });
          },
          error => {
            this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
          }
        );         
      });      
    }
  }  

  setMachineCode(event) {
    this.product.machine_code = event;
  }

  getMachineList(list) {
    this.machinelist = list.reduce((obj, item) => {
      obj[item["code"]] = item.dropdown_label;
      return obj;
    }, {});

    this.columnDefs = [
      {
        headerName: "Canal",
        field: "channel_name",
        editable: false         
      },
      {
        headerName: "Máquina",
        field: "machine_code",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: { values: this.extractValues(this.machinelist) },
        refData: this.machinelist
      },    
      {
        headerName: "Produto",
        field: "name",
        editable: true
      },
    ];   
    this.context = { componentParent: this };    
  }

}
