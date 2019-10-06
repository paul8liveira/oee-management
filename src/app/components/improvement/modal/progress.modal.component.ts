import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProgressImprovement } from "../../../models/progress.improvement";
import { ProgressService } from "../../../services/improvement/progress.service";


@Component({
    selector: 'modal-content',
    template: `
    <div class="modal-header">
        <h5 class="modal-title pull-left">{{title}}</h5>
        <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <form  *ngIf="progress | async; else loading" [formGroup]="form"
              (ngSubmit)="form.valid && confirm($event)">
            <input 
              id="progress_id" 
              formControlName="progress_id"
              type="hidden"/>
            <input 
              id="action_id" 
              formControlName="action_id"
              type="hidden"/>
            <input 
              id="channel_id" 
              formControlName="channel_id"
              type="hidden"/>
          
          <div class="form-row">
          
              <div class="form-group col-md-6">
                  <label for="owner">Responsáveis</label>
                  <input 
                      id="owner" 
                      formControlName="owner"
                      type="text" 
                      class="form-control" 
                      placeholder="Responsáveis"/>                      
              </div>  
  
              
              <div class="col-md-3 mb-3">
                  <label for="status">Situação</label>
                  <dropdown-improvement-status (changeEvent)="setStatus($event)"></dropdown-improvement-status>
              </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="description">Descrição</label>
                    <input 
                        id="description" 
                        formControlName="description"
                        type="text" 
                        class="form-control" 
                        placeholder="Descrição"/>                    
                </div>
            </div>

            <div class="form-row">            
                <div class="form-group col-md-6">
                <label for="starts_at">Data de início</label>
                <input 
                    name="starts_at" 
                    [(ngModel)]="progress.starts_at" 
                    #starts_at="ngModel"
                    type="date"
                    class="form-control form-control-no-border"
                    required autofocus>
                </div>

                <div class="form-group col-md-6">
                    <label for="finished_at">Data de conclusão</label>
                    <input 
                        name="finished_at" 
                        [(ngModel)]="progress.finished_at" 
                        #finished_at="ngModel"
                        type="date"
                    class="form-control form-control-no-border">
                </div>
            </div>
                <button 
                    type="submit" 
                    class="btn btn-outline-primary" 
                    [disabled]="!form.valid">Confirmar</button>            
        </form>
        <ng-template #loading>
            Carregando...
        </ng-template>        
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="bsModalRef.hide()">Fechar</button>
    </div>
`,
  })
   
  export class ProgressModalComponent implements OnInit {
    title: string;
    action_id: number;
    channel_id: number;
    progress_id: number;
    statusInclud: number;
    form: FormGroup;
    progress: Observable<ProgressImprovement>;
    
    constructor(
      public bsModalRef: BsModalRef,
      private progressService: ProgressService,
      public toastr: ToastsManager,
      private formBuilder: FormBuilder,
      vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);      
    }
    
    ngOnInit() {
      this.form = this.formBuilder.group({
        progress_id:  [this.progress_id],
        action_id: [this.action_id],
        channel_id: [this.channel_id],
        description: ['', Validators.required],
        owner: ['', Validators.required],
        status: ['Não Iniciado', Validators.required],
        starts_at: [, Validators.required],
        finished_at: [''],
      });

      
      this.progress = this.progressService.list(this.progress_id)
      .pipe(
        tap(progress => this.form.patchValue(progress))
      );
      
    }

    setStatus($event) {
      this.statusInclud = $event;
    }
    confirm(event) {
      event.preventDefault();

      this.progressService.add(this.form.value)
      .subscribe(
        result => {
          this.toastr.success("Progresso registrado.", "Sucesso!", { enableHTML: true, showCloseButton: true });
        },
        error => {
          this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
        }
      );      
    }
  }