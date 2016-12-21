import {Directive, HostBinding, HostListener} from "@angular/core";

@Directive({
    selector: '[myBorder]'
})
export class MyBorder {
    @HostBinding('class.myBorder') hasBorder: Boolean = false;

    @HostListener('mouseenter')
    onMouseEnter() {
        this.hasBorder = true;
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.hasBorder = false;
    }
}