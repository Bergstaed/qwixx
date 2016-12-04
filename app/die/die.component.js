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
var core_1 = require('@angular/core');
var random_number_service_1 = require("./random-number.service");
var DieComponent = (function () {
    function DieComponent(randomNumberService) {
        this.randomNumberService = randomNumberService;
        this.value = 0;
        this.visible = false;
    }
    DieComponent.prototype.roll = function () {
        var _this = this;
        this.visible = false;
        this.value = this.randomNumberService.getNr(1, 6);
        setTimeout(function () { _this.visible = true; }, 100);
    };
    DieComponent.prototype.ngOnInit = function () {
        // this.roll();
    };
    __decorate([
        core_1.Input('backColOfDie'), 
        __metadata('design:type', String)
    ], DieComponent.prototype, "backgroundColorOfDie", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DieComponent.prototype, "colorOfDie", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DieComponent.prototype, "rollAgainNr", void 0);
    DieComponent = __decorate([
        core_1.Component({
            selector: 'my-die',
            providers: [random_number_service_1.RandomNumberService],
            template: "\n\t<div class=\"die visible-{{visible}}\" [ngStyle]=\"{'background': backgroundColorOfDie,'color':colorOfDie}\">\n\t\t{{value}}\n\t</div>",
            styles: ["\n\t .die {\n\t    display: inline-block;\n\t    width: 30px;\n\t    height: 30px;\n\t    text-align: center;\n\t    vertical-align: middle;\n\t }\n\t .die.visible-false {\n\t    visibility: hidden;\n\t }\n"]
        }), 
        __metadata('design:paramtypes', [random_number_service_1.RandomNumberService])
    ], DieComponent);
    return DieComponent;
}());
exports.DieComponent = DieComponent;
/*
 templateUrl: './die.component.html',

 styleUrls: ['./die.component.css']
 */ 
//# sourceMappingURL=die.component.js.map