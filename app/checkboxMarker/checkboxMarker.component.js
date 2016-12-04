"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
// 'margin-top': isClickPossibleRound1? '0':'3px',
// 'height': isClickPossibleRound1? '35px':'30px'
var CheckboxMarkerComponent = (function () {
    function CheckboxMarkerComponent() {
        this.isClickPossibleRound1 = false;
        this.isClickPossible = false;
        this.clickCheckMarker = new core_1.EventEmitter();
    }
    CheckboxMarkerComponent.prototype.clickBox = function () {
        if (this.isDisabled) {
            return;
        }
        if (!this.isClickPossible && !this.isClickPossibleRound1) {
            return;
        }
        this.isMarked = true;
        this.isDisabled = true;
        this.clickCheckMarker.emit(this.indexOfBox);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CheckboxMarkerComponent.prototype, "colorNrOfBox", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CheckboxMarkerComponent.prototype, "colorOfBox", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CheckboxMarkerComponent.prototype, "indexOfBox", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CheckboxMarkerComponent.prototype, "boxNr", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CheckboxMarkerComponent.prototype, "round", void 0);
    __decorate([
        // 0: white dices another player,  1: white dices active, 2: colored dices active
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CheckboxMarkerComponent.prototype, "isLastInRow", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CheckboxMarkerComponent.prototype, "clickCheckMarker", void 0);
    CheckboxMarkerComponent = __decorate([
        core_1.Component({
            selector: 'checkbox-marker',
            template: "<span class=\"checkbox-marker\"\n                    [ngClass]=\"{'isMarked': isMarked, 'disabled': isDisabled}\"\n                    [ngStyle]=\"{'border-color': colorOfBox,\n                            'cursor': isDisabled || (!isClickPossibleRound1 && !isClickPossible)? 'auto':'pointer',\n                            'border-bottom-width': isClickPossible? '5px':'2px',\n                            'border-bottom-style': isClickPossible? 'dotted':'solid',\n                            'border-top-width': isClickPossibleRound1? '5px':'2px',\n                            'padding-top': isClickPossibleRound1? '1px':'4px'\n                                }\"\n                    [attr.title]=\"isLastInRow? 'Ankreuzbar, wenn mind. 5 Felder angekreuzt sind':''\"\n                    (click)=\"clickBox()\">{{boxNr}}</span>",
            styles: ["\n    .checkbox-marker {\n        display: table-cell;\n        width: 35px;\n        height: 35px;\n        border: 2px solid black;\n        float: left;\n        margin-right: 1px;\n        margin-bottom: 3px;\n        text-align: center;\n        vertical-align: middle;\n        color: grey;\n        font-weight: 600;\n        cursor: pointer;\n    }\n    \n    .isMarked {\n        background-color: darkslategray;\n    }\n    .disabled {\n        opacity: 0.4;\n    }\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], CheckboxMarkerComponent);
    return CheckboxMarkerComponent;
}());
exports.CheckboxMarkerComponent = CheckboxMarkerComponent;
//# sourceMappingURL=checkboxMarker.component.js.map