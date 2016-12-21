import {Directive, HostListener, Input, ElementRef} from "@angular/core";

@Directive({
    selector: '[myHighlight]'
})
export class MyHighight {

    constructor(private el: ElementRef) { }

    @HostListener('mouseenter')
    onMouseEnter() {
        this.highlight(this.highlightColor || 'red');
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.highlight(null);
    }
    @Input ('myHighlight') highlightColor:string;

    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}