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
var mock_colors_qwixx_1 = require("../mock-colors-qwixx");
var die_component_1 = require("../die/die.component");
var shared_service_1 = require("../shared.service");
var DieRowComponent = (function () {
    function DieRowComponent(sh, cdRef) {
        this.sh = sh;
        this.cdRef = cdRef;
        this.possibleValues_ArNum = { all: [], col0: [], col1: [], col2: [], col3: [] };
        this.transfer = new core_1.EventEmitter();
    }
    DieRowComponent.prototype.ngAfterViewInit = function () {
        this.rollAllDices();
        // avoid: Expression has changed after it was checked
        this.cdRef.detectChanges();
    };
    DieRowComponent.prototype.getBackCol = function (colorNr) {
        return mock_colors_qwixx_1.COLORS_QWIXX.diceBackground[colorNr];
    };
    DieRowComponent.prototype.getColor = function (colorNr) {
        return mock_colors_qwixx_1.COLORS_QWIXX.diceColor[colorNr];
    };
    DieRowComponent.prototype.testShared = function () {
        this.sh.name = 'Name in Service-Name überschrieben';
        this.sh.rowcolor = [0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0];
    };
    DieRowComponent.prototype.rollAllDices = function () {
        var dieVal = [];
        this.dieComponentList.forEach(function (component) {
            component.roll();
            dieVal.push(component.value);
        });
        var ar = [
            (dieVal[0] + dieVal[1]),
            (dieVal[0] + dieVal[2]),
            (dieVal[0] + dieVal[3]),
            (dieVal[0] + dieVal[4]),
            (dieVal[0] + dieVal[5]),
            (dieVal[1] + dieVal[2]),
            (dieVal[1] + dieVal[3]),
            (dieVal[1] + dieVal[4]),
            (dieVal[1] + dieVal[5])];
        this.possibleValues_ArNum.all = [(dieVal[0] + dieVal[1])];
        this.possibleValues_ArNum.col0 = [(dieVal[0] + dieVal[2])];
        this.possibleValues_ArNum.col0.push(dieVal[1] + dieVal[2]);
        this.possibleValues_ArNum.col1 = [(dieVal[0] + dieVal[3])];
        this.possibleValues_ArNum.col1.push(dieVal[1] + dieVal[3]);
        this.possibleValues_ArNum.col2 = [(dieVal[0] + dieVal[4])];
        this.possibleValues_ArNum.col2.push(dieVal[1] + dieVal[4]);
        this.possibleValues_ArNum.col3 = [(dieVal[0] + dieVal[5])];
        this.possibleValues_ArNum.col3.push(dieVal[1] + dieVal[5]);
        //ar.sort((a, b) => a - b);
        //this.possibleValues_ArNum = {all:[7], col0:[], col1:[], col2:[], col3:[]};
        this.possibleValues = "";
        this.possibleValues += "All: " + this.possibleValues_ArNum.all.toString();
        this.possibleValues += " red: " + this.possibleValues_ArNum.col0.toString();
        this.possibleValues += " yellow: " + this.possibleValues_ArNum.col1.toString();
        this.possibleValues += " green: " + this.possibleValues_ArNum.col2.toString();
        this.possibleValues += " blue: " + this.possibleValues_ArNum.col3.toString();
        this.transfer.emit(this.possibleValues_ArNum);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DieRowComponent.prototype, "transfer", void 0);
    __decorate([
        core_1.ViewChildren(die_component_1.DieComponent), 
        __metadata('design:type', core_1.QueryList)
    ], DieRowComponent.prototype, "dieComponentList", void 0);
    DieRowComponent = __decorate([
        core_1.Component({
            selector: 'dieRow',
            template: "\n    <my-die [backColOfDie]=\"getBackCol(4)\" [colorOfDie]=\"getColor(4)\" ></my-die>\n    <my-die [backColOfDie]=\"getBackCol(4)\" [colorOfDie]=\"getColor(4)\" ></my-die> <span class=\"dist\"></span>\n    <my-die [backColOfDie]=\"getBackCol(0)\" [colorOfDie]=\"getColor(0)\" ></my-die>\n    <my-die [backColOfDie]=\"getBackCol(1)\" [colorOfDie]=\"getColor(1)\" ></my-die>\n    <my-die [backColOfDie]=\"getBackCol(2)\" [colorOfDie]=\"getColor(2)\" ></my-die>\n    <my-die [backColOfDie]=\"getBackCol(3)\" [colorOfDie]=\"getColor(3)\" ></my-die>\n    <button (click)=\"rollAllDices()\">W\u00FCrfeln</button> <br>\n    <div>{{possibleValues}} <button (click)=\"testShared()\">\u00DCberschreibe Name</button></div>\n    \n",
            styles: ["\n.dist {padding: 0 3px}"]
        }), 
        __metadata('design:paramtypes', [shared_service_1.SharedService, core_1.ChangeDetectorRef])
    ], DieRowComponent);
    return DieRowComponent;
}());
exports.DieRowComponent = DieRowComponent;
//# sourceMappingURL=dieRow.component.js.map