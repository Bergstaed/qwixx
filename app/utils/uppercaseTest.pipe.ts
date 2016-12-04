import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'upper'
})
export class UppercaseTestPipe implements PipeTransform {
    transform(str:string, testFunctionNr:number = 2) {
        let res1:string = str.replace(/qwixx|otto|test/gi,
            function(x){
                return x.toUpperCase();
            } );
        let res2:string = str.replace(/arrowFunction|qwixx|otto|test/gi,
            function(x) { return x.toUpperCase(); }
        );

        return testFunctionNr === 2 ? res2: res1;
    }
}