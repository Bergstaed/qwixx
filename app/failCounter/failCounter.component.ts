
import {Component} from "@angular/core";
@Component ({
    selector:'failCounter',
    template: `<button (click)="addFailCount()">Fehlwurf</button> <span> Anzahl Fehlwürfe:{{failCounts}}</span>`
})
export class FailCounterComponent {
    constructor(){}
    failCounts:number = 0;

    addFailCount(){
        this.failCounts++;
    }
}