import { Injectable } from '@angular/core';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';

@Injectable()
export class BaseService {
    constructor() {

    }   

    protected handleError(error: HttpErrorResponse) {
        let returnMessage = "";
        if (error.error instanceof ErrorEvent) {
          returnMessage = "Um erro ocorreu: ", error.error.message;
        } 
        else {
          let stringError = JSON.stringify(error);
          let objError = JSON.parse(stringError);

          //retornos:
          // 400 - validações em geral
          // 401 - token invalido
          // 500 - exceção não tratada

          if(objError.status == 400) {
            returnMessage += "<ul>";
            let objBody = JSON.parse(objError._body);
            objBody.forEach(item => {
              returnMessage += "<li>" + item.msg + "</li>"
            });
            returnMessage += "</ul>";
          }
          if(objError.status == 401) {
            returnMessage = objError._body;
          }
          //exceção. não vou mostrar o retorno do server mas vou deixar no console
          if(objError.status == 500) {
            returnMessage = "Parece que houve um erro de comunicação, tente daqui a pouco.";
          }
          
          console.error(
            `Backend returned code ${objError.status}, ` +
            `body was: ${objError._body}`);
        }

        return new ErrorObservable(returnMessage);
      };    
}