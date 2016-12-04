import {Injectable} from '@angular/core';

@Injectable()
export class SharedService {
    dataArray: string[] = [];
    _name:string;
    rowcolor:Array<number> = [0,0,0,0,0,0,0,0,0,0,0];
    rowColors = [
        [0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1],
        [2,2,2,2,2,2,2,2,2,2,2],
        [3,3,3,3,3,3,3,3,3,3,3]
    ];
    rowNumbers = [
        [2,3,4,5,6,7,8,9,10,11,12],
        [2,3,4,5,6,7,8,9,10,11,12],
        [12,11,10,9,8,7,6,5,4,3,2],
        [12,11,10,9,8,7,6,5,4,3,2]
    ];

    insertData(data: string){
        this.dataArray.unshift(data);
    }
    set name(name: string) {
        this._name = (name && name.trim()) || '<no name set>';
    }
    get name() { return this._name; }
}