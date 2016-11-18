// Taken from ng2-mdl

import { Directive, AfterViewInit, ElementRef } from '@angular/core';
declare let componentHandler: any;

@Directive({
  selector: '[mdl]'
})
export class MdlDirective implements AfterViewInit {
  constructor(public elem: ElementRef) {}

  ngAfterViewInit() {
    componentHandler.upgradeElements(this.elem.nativeElement);
  }
}
