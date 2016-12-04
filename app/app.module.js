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
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var checkboxMarker_component_1 = require("./checkboxMarker/checkboxMarker.component");
var checkboxMarkerRow_component_1 = require("./checkboxMarkerRow/checkboxMarkerRow.component");
var reverse_pipe_1 = require("./utils/reverse.pipe");
var die_component_1 = require("./die/die.component");
var uppercaseTest_pipe_1 = require("./utils/uppercaseTest.pipe");
var dieRow_component_1 = require("./dieRow/dieRow.component");
var shared_service_1 = require("./shared.service");
var qwixxPoints_pipe_1 = require("./utils/qwixxPoints.pipe");
var failCounter_component_1 = require("./failCounter/failCounter.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule],
            declarations: [app_component_1.AppComponent,
                checkboxMarkerRow_component_1.CheckboxmarkerRowComponent, checkboxMarker_component_1.CheckboxMarkerComponent,
                die_component_1.DieComponent, dieRow_component_1.DieRowComponent,
                failCounter_component_1.FailCounterComponent,
                reverse_pipe_1.ReversePipe, uppercaseTest_pipe_1.UppercaseTestPipe, qwixxPoints_pipe_1.QwixxPointsPipe],
            providers: [shared_service_1.SharedService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
// ParentComponent, ChildComponent, ChildSiblingComponent
//     providers: [SharedService], 
//# sourceMappingURL=app.module.js.map