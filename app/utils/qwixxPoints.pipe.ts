import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'qwixxPoints'
})
export class QwixxPointsPipe implements PipeTransform {
    transform(num:number): number {
        let res:number = 0;
        for (let i=1; i<=num; i++) {
            res += i;
        }
        return res;
    }

}