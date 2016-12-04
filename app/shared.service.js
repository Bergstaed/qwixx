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
var SharedService = (function () {
    function SharedService() {
        this.dataArray = [];
        this.rowcolor = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.rowColors = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
        ];
        this.rowNumbers = [
            [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
            [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
        ];
    }
    SharedService.prototype.insertData = function (data) {
        this.dataArray.unshift(data);
    };
    Object.defineProperty(SharedService.prototype, "name", {
        get: function () { return this._name; },
        set: function (name) {
            this._name = (name && name.trim()) || '<no name set>';
        },
        enumerable: true,
        configurable: true
    });
    SharedService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SharedService);
    return SharedService;
}());
exports.SharedService = SharedService;
//# sourceMappingURL=shared.service.js.map