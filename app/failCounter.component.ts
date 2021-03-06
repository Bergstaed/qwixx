
import {Component, Output, EventEmitter, Input, OnInit, OnChanges, SimpleChanges} from "@angular/core";
@Component ({
    selector:'failCounter',
    template: `<button [disabled]="!isActive"
    (click)="addFailCount()" class="button--big">Fehlwurf</button>
     <span> Anzahl Fehlwürfe: {{failCounts}}</span>`
})
export class FailCounterComponent implements OnInit, OnChanges {
    isActive:boolean = true;
    failCounts:number;
    @Input() isActivePlayer:boolean;
    @Output() failCounterPressed:EventEmitter<number> = new EventEmitter();

    constructor(){}

    ngOnInit(): void {
        this.resetFailCounts();
        this.isActive = this.isActivePlayer;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isActive = this.isActivePlayer;
    }

    resetFailCounts():void {
        this.failCounts = 0;
    }

    addFailCount() {
        if (!this.isActive){
            return;
        }
        this.failCounts++;
        this.failCounterPressed.emit(this.failCounts);
        this.isActive = false;
    }
}