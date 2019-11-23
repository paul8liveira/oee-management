import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../base.component';
import { ActionImprovement } from '../../models/action.improvement';
import { ActionService } from '../../services/improvement/action.service';
import { ActionImprovementGridButtonRenderer } from './grid/action.grid.buttons.component';

@Component({
  selector: 'app-improvement',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent extends BaseComponent implements OnInit {
  action: ActionImprovement = new ActionImprovement();
  dropdownChannel;  
  statusMappings = {
    0: "Não Iniciado",
    1: "Em Andamento",
    2: "Finalizado",
  };
  priorityMappings = {
    0: "Baixa",
    1: "Média",
    2: "Alta",
  };
  gridApi;
  gridColumnApi;
  columnDefs;
  paginationPageSize = 10;
  rowSelection = "multiple";
  editType = "fullRow";
  context;
  currentUser;
  machineInclud :string;
  pauseInclud :number;
  statusInclud :number;
  priorityInclud :number;
  components;
  frameworkComponents;

  constructor(private actionService: ActionService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    super();
    this.currentUser = this.getCurrentUser();
    this.dropdownChannel = localStorage.getItem('channelId');
    this.toastr.setRootViewContainerRef(vcr);
    this.columnDefs = [
      {
        headerName: "id",
        field: "action_id",
        hide: true,
      },
      {
        headerName: "Máquina",
        field: "machine_code",
        hide: true,
      },
      {
        headerName: "Equipamento",
        field: "machine_label",
      },
      {
        headerName: "Id da Pausa",
        field: "pause_reason_id",
        hide: true,
      },
      {
        headerName: "Item",
        field: "pause_name",
      },
      {
        headerName: "Ganho",
        field: "gain",
        editable: true,
        hide: false,
        cellEditor: "agLargeTextCellEditor",
      },
      {
        headerName: "Descrição",
        field: "description",
        editable: true,
        cellEditor: "agLargeTextCellEditor",
      },
      {
        headerName: "Detalhamento",
        field: "detailing",
        editable: true,
        cellEditor: "agLargeTextCellEditor",
      },
      {
        headerName: "Responsáveis",
        field: "owner",
        editable: true,
      },
      {
        headerName: "Prioridade",
        field: "priority",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: { values: this.extractValues(this.priorityMappings) },
        refData: this.priorityMappings
      },
      {
        headerName: "Situação",
        field: "status",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: { values: this.extractValues(this.statusMappings) },
        refData: this.statusMappings,
      },
      {
        headerName: "Início",
        field: "starts_at",
        editable: true,
        cellEditor: "datePicker",
      },
      {
        headerName: "Fim",
        field: "finished_at",
        editable: true,
        cellEditor: "datePicker",
      },
      {
        headerName: "Op.",
        cellRenderer: "actionImprovementGridButtonRenderer",
        colId: "params",
        width: 110,
      },
    ];
     
    this.context = { componentParent: this };
    this.components = { datePicker: this.getDatePicker() };
    this.frameworkComponents = {
      actionImprovementGridButtonRenderer: ActionImprovementGridButtonRenderer
    };
  }

  ngOnInit() {
  }
  
  setMachine($event) {
    this.machineInclud = $event;
  }

  setPause($event) {
    this.pauseInclud = $event.id;
  }
  
  setStatus($event) {
    this.statusInclud = $event;
  }

  setPriority($event) {
    this.priorityInclud = $event;
  }
  
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.actionService.listAll()
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
    
    this.action.channel_id = this.dropdownChannel
    this.action.machine_code = this.machineInclud
    this.action.pause_reason_id = this.pauseInclud
    this.action.priority = this.priorityInclud
    this.action.status = this.statusInclud
    
    this.actionService.add(this.action)
    .subscribe(
      result => {
        const action : ActionImprovement = {
           action_id : result.action_id,
           channel_id : result.channel_id,
           machine_code : result.machine_code,
           machine_label : result.machine_label,
           pause_reason_id : result.pause_reason_id,
           pause_name : result.pause_name,
           gain : result.gain,
           description : result.description,
           detailing : result.detailing,
           owner : result.owner,
           priority : result.priority,           
           status : result.status,
           starts_at : result.starts_at,
           finished_at : result.finished_at,
           created_at : result.created_at
        };
        this.gridApi.updateRowData({ add: [action] });
        
        this.action = new ActionImprovement();
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }
    );    
  }

  update(data) {
    
    this.actionService.update(data)
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
        this.actionService.delete(row)
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
