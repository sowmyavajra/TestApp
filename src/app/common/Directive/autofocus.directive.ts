import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }

  constructor(private el :ElementRef) { }

}
