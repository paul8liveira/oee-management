import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProgressModalComponent } from "../modal/progress.modal.component";

@Component({
    selector: 'progress-improvement-grid-buttons',
    template: `
    <div class="btn-group btn-group-sm" role="group">
        
        <button type="button" class="btn btn-outline-secondary" (click)="progressImprovementModal()" title="Editar Progresso da Ação">
            <fa name="edit"></fa>
        </button> 
    
    </div>      
    `,
})

export class ProgressImprovementGridButtonRenderer implements ICellRendererAngularComp {
    public params: any;
    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {}

    agInit(params: any): void {
        this.params = params;
    }

    public progressImprovementModal() {
        const initialState = {
            progress_id : this.params.data.progress_id,
            title : 'Editando progresso - ' + this.params.data.pause_name
        };
        this.bsModalRef = this.modalService.show(ProgressModalComponent, {initialState});
    }

    refresh(): boolean {
        return false;
    }
}