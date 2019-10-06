import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProgressModalComponent } from "../modal/progress.modal.component";

@Component({
    selector: 'improvement-grid-buttons',
    template: `
    <div class="btn-group btn-group-sm" role="group">
        
        <button type="button" class="btn btn-outline-secondary" (click)="progressImprovementModal()" title="Novo Progresso da Ação">
            <fa name="edit"></fa>
        </button> 
    
    </div>      
    `,
})

export class ImprovementGridButtonRenderer implements ICellRendererAngularComp {
    public params: any;
    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {}

    agInit(params: any): void {
        this.params = params;        
        this.params.data.name = 'Editar'        
    }

    public progressImprovementModal() {
        const initialState = {
            resume_id : this.params.data.resume_id,
            title : 'Resumo da Ação - ' + this.params.data.name
        };
        this.bsModalRef = this.modalService.show(ProgressModalComponent, {initialState});
    }

    refresh(): boolean {
        return false;
    }
}