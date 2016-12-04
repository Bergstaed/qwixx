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
var shared_service_1 = require("./shared.service");
var AppComponent = (function () {
    function AppComponent(sh, cdRef) {
        this.sh = sh;
        this.cdRef = cdRef;
        this.allowedBx = { all: [], col0: [], col1: [], col2: [], col3: [] };
        // dieRow sendet erlaubte Felder über EventEmitter hier in die app.component
        // Diese Daten von hier an CheckboxmarkerRow an Input senden
        this.title = 'qwixx';
        this.playerName = 'Michael';
        this.sumMarker = [0, 0, 0, 0];
        this.roundNr = 0;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.sh.name = "InitName";
        this.rowColors = this.sh.rowColors;
        this.rowNumbers = this.sh.rowNumbers;
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        // avoid: Expression has changed after it was checked
        this.cdRef.detectChanges();
    };
    AppComponent.prototype.checkSum = function (sum, id) {
        this.sumMarker[id] = sum;
    };
    AppComponent.prototype.getNumbers = function (rowNr) {
        return this.rowNumbers[rowNr];
    };
    AppComponent.prototype.getColors = function (rowNr) {
        return this.rowColors[rowNr];
    };
    AppComponent.prototype.getColorSpec = function () {
        return this.sh.rowcolor;
    };
    AppComponent.prototype.transferPossibleDieValues = function (ev) {
        this.allowedBx = ev;
        this.roundNr++;
    };
    AppComponent.prototype.nextPlayer = function () {
        this.playerName = this.playerName == "Du" ? "Spieler 2" : "Du";
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            template: "<div class=\"wrapper\">\n    <h1>{{title | upper}}</h1>\n    <h2>Am Zug: {{playerName}}</h2>\n  \n    <checkboxMarkerRow (tellSumOfMarker)=\"checkSum($event,0)\" [allowedBoxesToClick]=\"allowedBx\" [colorOfBoxes]=\"getColors(0)\" [numbersOfBoxes]=\"getNumbers(0)\" [round]=\"roundNr\"></checkboxMarkerRow>\n    <checkboxMarkerRow (tellSumOfMarker)=\"checkSum($event,1)\" [allowedBoxesToClick]=\"allowedBx\" [colorOfBoxes]=\"getColors(1)\" [numbersOfBoxes]=\"getNumbers(1)\" [round]=\"roundNr\"></checkboxMarkerRow>\n    <checkboxMarkerRow (tellSumOfMarker)=\"checkSum($event,2)\" [allowedBoxesToClick]=\"allowedBx\" [colorOfBoxes]=\"getColors(2)\" [numbersOfBoxes]=\"getNumbers(2)\" [round]=\"roundNr\"></checkboxMarkerRow>\n    <checkboxMarkerRow (tellSumOfMarker)=\"checkSum($event,3)\" [allowedBoxesToClick]=\"allowedBx\" [colorOfBoxes]=\"getColors(3)\" [numbersOfBoxes]=\"getNumbers(3)\" [round]=\"roundNr\"></checkboxMarkerRow>\n    <failCounter></failCounter>\n    <br><br>\n    <dieRow (transfer)=\"transferPossibleDieValues($event)\"></dieRow>\n    <br>\n      <button (click)=\"nextPlayer()\">Fertig</button>\n      <br>\n    <button disabled>Neues Spiel</button><br><br>\n    <a href=\"http://www.brettspiele-magazin.de/qwixx-gemixxt/\" target=\"_blank\">Varianten Qwixx</a>\n    </div>\n"
        }), 
        __metadata('design:paramtypes', [shared_service_1.SharedService, core_1.ChangeDetectorRef])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map