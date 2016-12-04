import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'reverse'
})
export class ReversePipe implements PipeTransform {
    transform(arr:any, hasToReverse:boolean=true) {
        let copy = arr.slice();
        if (hasToReverse){
            return copy.reverse();
        } else {
            return arr;
        }
    }
}