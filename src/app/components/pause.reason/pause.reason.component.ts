import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../base.component';
import { PauseReason } from '../../models/pause.reason';
import { PauseReasonService } from '../../services/pause.reason/pause.reason.service';

@Component({
  selector: 'app-pause-reason',
  templateUrl: './pause.reason.component.html',
  styleUrls: ['./pause.reason.component.css']
})
export class PauseReasonComponent extends BaseComponent implements OnInit {
  pause: PauseReason = new PauseReason();
  dropdownChannel;
  statusMappings = {
    0: "Inativo",
    1: "Ativo",
  };
  pauseTypeMappings = {
    'NP': "Não programada",
    'PP': "Programada",
  };
  gridApi;
  gridColumnApi;
  columnDefs;
  paginationPageSize = 10;
  rowSelection = "multiple";
  editType = "fullRow";
  context;
  currentUser;
  statusInclud: boolean;
  pauseTypeInclud: string;

  constructor(private pauseService: PauseReasonService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    super();
    this.currentUser = this.getCurrentUser();
    this.dropdownChannel = localStorage.getItem('channelId');
    this.toastr.setRootViewContainerRef(vcr);
    this.statusInclud = true

    this.columnDefs = [
      {
        headerName: "Código",
        field: "pause_reason_id",
        hide: true,
      },
      {
        headerName: "Nome",
        field: "name",
        editable: true,
      },
      {
        headerName: "Descrição",
        field: "description",
        editable: true,
      },
      {
        headerName: "Situação",
        field: "active",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: { values: this.extractValues(this.statusMappings) },
        refData: this.statusMappings,
        editable: true,
      },
      {
        headerName: "Tipo",
        field: "type",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: { values: this.extractValues(this.pauseTypeMappings) },
        refData: this.pauseTypeMappings,
        editable: true,
      },
      {
        headerName: "Criado em",
        field: "created_at",
        hide: true,
      },
    ];
     
    this.context = { componentParent: this };
  }

  ngOnInit() {
  }  
  
  setStatus($event) {
    this.statusInclud = $event;
  }

  setType($event) {
    this.pauseTypeInclud = $event;
  }
  
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.pauseService.listAll()
    .subscribe(
      result => {
        params.api.setRowData(result);
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }); 
    params.api.sizeColumnsToFit();   
  }

  onCellValueChanged(event) {    
    this.update(event.data);
  } 

  add(event) {
    event.preventDefault();
    
    this.pause.type = this.pauseTypeInclud
    this.pause.active = this.statusInclud
    
    this.pauseService.add(this.pause)
    .subscribe(
      result => {
        const pause : PauseReason = {
            pause_reason_id : result.pause_reason_id,
            name : result.name,
            description : result.description,
            active : result.active,
            type : result.type,
            created_at : result.created_at,
        };
        this.gridApi.updateRowData({ add: [pause] });
        
        this.pause = new PauseReason();
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }
    );    
  }

  update(data) {
    
    this.pauseService.update(data)
    .subscribe(
      result => {},
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }
    );    
  }

  delete() {
    let selectedData = this.gridApi.getSelectedRows();  
    
    if(selectedData.length > 0) {
      selectedData.forEach(row => {
        this.pauseService.delete(row)
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

}
