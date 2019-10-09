import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActionModalComponent } from "../modal/action.modal.component";

@Component({
    selector: 'resume-improvement-grid-buttons',
    template: `
    <div class="btn-group btn-group-sm" role="group">
        
        <button type="button" class="btn btn-outline-secondary" (click)="actionImprovementModal()" title="Editar ação">
            <fa name="edit"></fa>
        </button> 
    
    </div>      
    `,
})

export class ActionImprovementGridButtonRenderer implements ICellRendererAngularComp {
    public params: any;
    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {}

    agInit(params: any): void {
        this.params = params;
        
    }

    public actionImprovementModal() {
        const initialState = {
            action_id : this.params.data.action_id,
            title : 'Editando Ação - ' + this.params.data.machine_label
        };
        this.bsModalRef = this.modalService.show(ActionModalComponent, {initialState});
    }

    refresh(): boolean {
        return false;
    }
}