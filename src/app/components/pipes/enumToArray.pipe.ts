import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

/**
  * Usage: *ngFor="let item of roleEnum | enumToArray:'notIn = id do enum separado por virgula'"'
 **/
@Pipe({
    name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
    translateKey: string = "PIPES.ACTIVITY_TYPE.";
    
    constructor(private translate: TranslateService) { }

    transform(data: Object, notIn: string = '') {
        const notIntList = notIn.split(',');        
        const keys = Object.keys(data);
        const enumList = keys.slice(0, keys.length / 2).map((key) => {
            //se passou notIn como parametro os itens em notIn, ficam nulos
            if (notIntList.indexOf(key) == -1)
                return { key: key, description: this.translate.instant(this.translateKey + data[key].toUpperCase()) };
            else
                return null;
        })
        //aqui, retiro os itens nulos
        .filter(function (el) {
            return el != null;
        });

        return enumList.sort(function (a, b) {
            if (a.description > b.description) return 1;            
            if (a.description < b.description) return -1;        
            return 0;
        });
    }
}