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
              id="channel_id" 
              formControlName="channel_id"
              type="hidden"/>
            <input 
              id="pause_reason_id" 
              formControlName="pause_reason_id"
              type="hidden"/>
            
            <div class="form-row">
          
              <div class="form-group col-md-6">
                  <label for="owner">Responsáveis</label>
                  <input 
                      id="owner" 
                      formControlName="owner"
                      type="text" 
                      class="form-control" 
                      required autofocus/>                      
              </div>
              
              <div class="form-group col-md-6">
                  <label for="status">Situação</label>
                  <dropdown-improvement-status (changeEvent)="setStatus($event)"></dropdown-improvement-status>
              </div>

            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="starts_at">Data de início</label>
                  <input 
                    id="starts_at"    
                    formControlName="starts_at"
                    type="date"
                    class="form-control"
                    required autofocus/>
                </div>
            
                <div class="form-group col-md-6">
                    <label for="finished_at">Data de conclusão</label>
                    <input 
                      id="finished_at" 
                      formControlName="finished_at" 
                      type="date"
                      class="form-control"
                      required autofocus/>
                </div>
            </div>

            <div class="form-row">
                
                <div class="form-group col-md-12">
                    <label for="description">Descrição</label>
                    <textarea
                        id="description" 
                        formControlName="description"
                        rows="3"
                        class="form-control" 
                        required autofocus>
                    </textarea>
                </div>
            </div>

            <div class="form-row">
                
                <div class="form-group col-md-12">
                  <label for="action_description">Descrição da ação</label>
                  <textarea
                      id="action_description" 
                      formControlName="action_description"
                      rows="3"
                      class="form-control" 
                      required autofocus>
                  </textarea>
                </div>

            </div>
            <!--
            <button 
                type="submit" 
                class="btn btn-outline-primary" 
                [disabled]="!form.valid">Confirmar</button>            
            -->
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
        channel_id: [this.channel_id],
        pause_reason_id: ['', Validators.required],
        owner: ['', Validators.required],
        description: ['', Validators.required],
        action_description: ['', Validators.required],
        status: ['Não Iniciado', Validators.required],
        starts_at: ['', Validators.required],
        finished_at: ['', Validators.required],
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
          this.toastr.success("Progresso salvo.", "Sucesso!", { enableHTML: true, showCloseButton: true });
        },
        error => {
          this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
        }
      );      
    }
  }