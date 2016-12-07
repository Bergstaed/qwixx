import {Component, Input, Output, EventEmitter} from "@angular/core";
// 'margin-top': isClickPossibleRound1? '0':'3px',
// 'height': isClickPossibleRound1? '35px':'30px'
@Component ({
    selector: 'checkbox-marker',
    template: `<span class="checkbox-marker noselect"
                    [ngClass]="{'isMarked': isMarked, 'disabled': isDisabled}"
                    [ngStyle]="{'border-color': colorOfBox,
                            'cursor': isDisabled || (!isClickPossibleRound1 && !isClickPossible)? 'default':'pointer',
                            'border-bottom-width': isClickPossible? '5px':'2px',
                            'border-bottom-style': isClickPossible? 'dotted':'solid',
                            'border-top-width': isClickPossibleRound1? '5px':'2px',
                            'padding-top': isClickPossibleRound1? '1px':'4px'
                                }"
                    [attr.title]="isLastInRow? 'Ankreuzbar, wenn mind. 5 Felder angekreuzt sind':''"
                    (click)="clickBox()">{{boxNr}}</span>`,
    styles: [`
    .checkbox-marker {
        display: table-cell;
        width: 35px;
        height: 35px;
        border: 2px solid black;
        float: left;
        margin-right: 1px;
        margin-bottom: 3px;
        text-align: center;
        vertical-align: middle;
        color: grey;
        font-weight: 600;
        cursor: default;
    }
    
    .isMarked {
        background-color: darkslategray;
    }
    .disabled {
        opacity: 0.4;
    }
`]
})
export class CheckboxMarkerComponent {
    @Input() colorNrOfBox:number;
    @Input() colorOfBox:string;
    // index of box is used to emit to parent component
    @Input() indexOfBox:number;
    @Input() boxNr:number;
    @Input() round:number; // 1: white dices active, 2: colored dices active
    @Input() isLastInRow:boolean;
    @Input() isActivePlayer:boolean;

    isDisabled:boolean;
    isClickPossibleRound1:boolean = false;
    isClickPossible:boolean = false;
    isMarked:boolean;

    @Output() clickCheckMarker:EventEmitter<number> = new EventEmitter();

    clickBox() {
        if (this.isDisabled) {
            return;
        }
        if (!this.isClickPossible && !this.isClickPossibleRound1) {
            return;
        }
        if (!this.isActivePlayer && !this.isClickPossibleRound1) {
            return;
        }
        this.isMarked = true;
        this.isDisabled = true;
        this.clickCheckMarker.emit(this.indexOfBox);
    }

}