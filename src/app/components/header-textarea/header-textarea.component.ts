import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, OnChanges } from '@angular/core';

@Component({
  selector: 'app-header-textarea',
  templateUrl: './header-textarea.component.html',
  styleUrls: ['./header-textarea.component.scss']
})
export class HeaderTextareaComponent implements OnInit, OnChanges {

  @Input() size: string; // Maybe give this a type (disjoint set of strings?)
  @Input() placeholder: string;
  @Input() value: string;
  @Input() readOnly: boolean;

  @Output() update = new EventEmitter<string>();

  @ViewChild('area') area: ElementRef;

  computedStyle;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    let fz;

    switch (this.size) {
      case 'x-small':
        fz = '0.8em';
        break;
      case 'small':
        fz = '1em';
        break;
      case 'normal':
        fz = '1.5em';
        break;
      case 'large':
        fz = '2em';
        break;
      case 'x-large':
        fz = '2.5em';
        break;
    }

    this.computedStyle = {
      'font-size': fz,
    };
  }

  onUpdate(e, title) {
    e.preventDefault();
    console.log(e, title);

    this.update.emit(title); // TODO: maybe trim the title?

    e.target.blur();
  }

  public focus() {
    this.area.nativeElement.focus();
  }

}
