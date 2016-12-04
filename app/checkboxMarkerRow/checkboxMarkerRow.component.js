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
var shared_service_1 = require("../shared.service");
var mock_colors_qwixx_1 = require("../mock-colors-qwixx");
var checkboxMarker_component_1 = require("../checkboxMarker/checkboxMarker.component");
var CheckboxmarkerRowComponent = (function () {
    function CheckboxmarkerRowComponent(sh) {
        this.sh = sh;
        this.tellSumOfMarker = new core_1.EventEmitter();
        this.rowNumbers = [];
        this.sumOfMarker = 0;
    }
    CheckboxmarkerRowComponent.prototype.ngOnInit = function () {
        this.rowNumbers = this.sh.rowNumbers[0];
    };
    CheckboxmarkerRowComponent.prototype.ngOnChanges = function (changes) {
        this.setAllowedNumbersToClick(this.allowedBoxesToClick);
    };
    CheckboxmarkerRowComponent.prototype.ngAfterViewInit = function () {
        // das letzte Element ist disabled:
        this.checkBoxMarkerCompList.last.isDisabled = true;
    };
    CheckboxmarkerRowComponent.prototype.toggleBox = function (id) {
        var _this = this;
        this.disableBoxesOnTheLeft(id);
        this.sumOfMarker++;
        this.tellSumOfMarker.emit(this.sumOfMarker);
        this.checkLastField();
        this.sharedServiceTest = this.sh.name;
        this.checkBoxMarkerCompList.forEach(function (component) {
            component.round = _this.round;
        });
    };
    CheckboxmarkerRowComponent.prototype.checkLastField = function () {
        if (this.sumOfMarker >= 5 && !this.checkBoxMarkerCompList.last.isMarked) {
            this.checkBoxMarkerCompList.last.isDisabled = false;
        }
    };
    CheckboxmarkerRowComponent.prototype.disableBoxesOnTheLeft = function (id) {
        this.checkBoxMarkerCompList.filter(function (item, index, array) { return index <= id; })
            .forEach(function (component) {
            component.isDisabled = true;
        });
        // https://angular.io/docs/js/latest/api/core/index/QueryList-class.html zeigt Interface von QueryList
        // let i:number = 0;
        // this.checkBoxMarkerCompList.forEach(component => {
        //     if (i++ <= id) {
        //         component.isDisabled = true;
        //     }
        // });
    };
    CheckboxmarkerRowComponent.prototype.getColor = function (colorNr) {
        return mock_colors_qwixx_1.COLORS_QWIXX.diceBackground[colorNr];
    };
    CheckboxmarkerRowComponent.prototype.setAllowedNumbersToClick = function (possValues) {
        if (!this.checkBoxMarkerCompList)
            return;
        this.checkBoxMarkerCompList.forEach(function (component) {
            component.isClickPossibleRound1 = possValues.all.indexOf(component.boxNr) >= 0;
            switch (component.colorNrOfBox) {
                case 0:
                    component.isClickPossible = possValues.col0.indexOf(component.boxNr) >= 0;
                    break;
                case 1:
                    component.isClickPossible = possValues.col1.indexOf(component.boxNr) >= 0;
                    break;
                case 2:
                    component.isClickPossible = possValues.col2.indexOf(component.boxNr) >= 0;
                    break;
                case 3:
                    component.isClickPossible = possValues.col3.indexOf(component.boxNr) >= 0;
                    break;
            }
        });
    };
    CheckboxmarkerRowComponent.prototype.getAValue = function (i) {
        return false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CheckboxmarkerRowComponent.prototype, "colorOfBoxes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CheckboxmarkerRowComponent.prototype, "numbersOfBoxes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CheckboxmarkerRowComponent.prototype, "reverseBoxes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CheckboxmarkerRowComponent.prototype, "allowedBoxesToClick", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CheckboxmarkerRowComponent.prototype, "round", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CheckboxmarkerRowComponent.prototype, "tellSumOfMarker", void 0);
    __decorate([
        core_1.ViewChildren(checkboxMarker_component_1.CheckboxMarkerComponent), 
        __metadata('design:type', core_1.QueryList)
    ], CheckboxmarkerRowComponent.prototype, "checkBoxMarkerCompList", void 0);
    CheckboxmarkerRowComponent = __decorate([
        core_1.Component({
            selector: 'checkboxMarkerRow',
            template: "\n<div style=\"clear: both; display: table\">\n<checkbox-marker\n    *ngFor=\"let box of rowNumbers; let i = index\" \n    [colorOfBox]=\"getColor(colorOfBoxes[i])\"\n    [colorNrOfBox]=\"colorOfBoxes[i]\"\n    [indexOfBox]=\"i\"\n    [boxNr]=\"numbersOfBoxes[i]\"\n    [isLastInRow]=\"i==rowNumbers.length-1\"\n    (choise)=\"toggleBox($event)\" ></checkbox-marker>\n    <span class=\"points\">{{sumOfMarker | qwixxPoints}}</span>\n    <span>{{sharedServiceTest}}</span>\n</div>\n",
            styles: ["\n.points {\n    display: inline-block;\n    padding: 6px 10px 0 5px;\n}\n"]
        }), 
        __metadata('design:paramtypes', [shared_service_1.SharedService])
    ], CheckboxmarkerRowComponent);
    return CheckboxmarkerRowComponent;
}());
exports.CheckboxmarkerRowComponent = CheckboxmarkerRowComponent;
//# sourceMappingURL=checkboxMarkerRow.component.js.map