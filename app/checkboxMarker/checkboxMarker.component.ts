import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, DoCheck} from "@angular/core";
import {SharedService} from "../shared.service";
// 'margin-top': isClickPossibleRound1? '0':'3px',
// 'height': isClickPossibleRound1? '35px':'30px'
// check variable behind {{boxNr}}:   <br>{{round}}
@Component ({
    selector: 'checkbox-marker',
    template: `<span class="checkbox-marker noselect"
                    [ngClass]="{'isMarked': isMarked, 'disabled': isDisabled,
                    'roundedCorner': hasRoundedCorner,
                    'hasShadow': hasShadow}"
                    [ngStyle]="{'border-color': colorOfBox,
                            'cursor': checkBoxCanBeClicked()? 'pointer':'default',
                            'border-bottom-width': isClickPossible? '5px':'2px',
                            'border-bottom-style': isClickPossible? 'dotted':'solid',
                            'border-top-width': isClickPossibleRound1? '5px':'2px',
                            'padding-top': isClickPossibleRound1? '1px':'4px'
                                }"
                    [attr.title]="isLastInRow? 'Ankreuzbar, wenn mind. 5 Felder angekreuzt sind':''"
                    (click)="clickBox()" >{{boxNr}}</span>`,
    styles: [`
    .checkbox-marker {
        display: table-cell;
        width: 35px;
        height: 35px;
        border: 2px solid black;
        float: left;
        margin-right: 2px;
        margin-bottom: 4px;
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
    .roundedCorner {
        border-radius: 6px;
    }
    
    .hasShadow {
        -webkit-box-shadow: 3px 3px 3px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 3px 3px 3px 0px rgba(0,0,0,0.75);
        box-shadow: 3px 3px 3px 0px rgba(0,0,0,0.75);
    }
`]
})
export class CheckboxMarkerComponent implements AfterViewInit, DoCheck {

    @Input() colorNrOfBox:number;
    @Input() colorOfBox:string;
    // index of box is used to emit to parent component
    @Input() indexOfBox:number;
    @Input() boxNr:number;
    @Input() round:number; // 0: white dices active, 1: colored dices active
    @Input() isLastInRow:boolean;
    @Input() isActivePlayer:boolean;
   // @Input() dummyChange:number;
    @Input() hasRoundedCorner:boolean;
    @Input() hasGameFinished:boolean;

    isDisabled:boolean;
    isClickPossibleRound1:boolean = false;
    isClickPossible:boolean = false;
    isMarked:boolean;
    hasShadow:boolean;

    constructor(private sh:SharedService){}

    @Output() clickCheckMarker:EventEmitter<number> = new EventEmitter();

    ngAfterViewInit(): void {
        this.setShadow();
    }

    ngDoCheck(): void {
    //ngOnChanges(changes: SimpleChanges): void {
        this.setShadow();
    }

    checkBoxCanBeClicked():boolean {
        if (this.isDisabled || this.hasGameFinished) {
            return false;
        }
        if (!this.isClickPossible && !this.isClickPossibleRound1) {
            return false;
        }
        if (!this.isActivePlayer && !this.isClickPossibleRound1) {
            return false;
        }
        if (this.round > 0 && !this.isClickPossible) {
            return false;
        }

        return true;
    }

    clickBox() {
        //this.hasRoundedCorner = !this.hasRoundedCorner;
        if (!this.checkBoxCanBeClicked()) {
            return;
        }

        this.isMarked = true;
        this.isDisabled = true;
        this.sh.possibleClickValue = this.getPossibleClickValue();
        this.clickCheckMarker.emit(this.indexOfBox);
    }

    setShadow():void {
        this.hasShadow = this.checkBoxCanBeClicked();
    }

    getPossibleClickValue():number {
        // 1: white; 2: color; 3: color and white;
        let result:number = 0;
        result += this.isClickPossibleRound1? 1:0;
        result += this.isClickPossible? 2:0;

        return result;
    }

}