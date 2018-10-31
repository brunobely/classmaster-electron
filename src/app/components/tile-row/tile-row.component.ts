import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Assignment } from '../../assignment';
import { StoreService } from '../../services/store/store.service';

import * as stringIncr from 'string-incr';

@Component({
  selector: 'app-tile-row',
  templateUrl: './tile-row.component.html',
  styleUrls: ['./tile-row.component.scss']
})
export class TileRowComponent implements OnInit, AfterViewChecked {

  @Input() assignment: Assignment;
  @Input() selected: boolean;

  @ViewChild('emptyTitle') emptyTitle: ElementRef;

  constructor(private store: StoreService) { }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    // console.log('NEW HOMEWORK', this.emptyTitle);

    // if (this.emptyTitle && this.emptyTitle.nativeElement.value === '') {
    //   this.emptyTitle.nativeElement.value = 'HOMEWORK';
    //   this.emptyTitle.nativeElement.select();
    // }
    if (this.emptyTitle) {
      this.emptyTitle.nativeElement.focus();
    }
  }

  placeholder(): string {
    // TODO: see if some library does incremental prediction?
    // ^ 'string-incr' does, but appends a number if there aren't any.
    //   Maybe extend it to return something different if there aren't numbers?
    //   Otherwise just check

    const assignmentsOfType = this.store.getFirstSelected().assignments[this.assignment.type];
    if (assignmentsOfType.length > 1) {
      const prevTitle = assignmentsOfType[assignmentsOfType.length - 2].title;
      console.log('PREVTITLE', this.assignment.type);
      console.log('PREVTITLE', this.store.getFirstSelected().assignments);
      console.log('PREVTITLE', assignmentsOfType);
      console.log('PREVTITLE', assignmentsOfType.length);
      console.log('PREVTITLE', assignmentsOfType[assignmentsOfType.length - 2]);
      console.log('PREVTITLE', prevTitle);

      // Check if string has number
      // See: https://stackoverflow.com/questions/5778020/check-whether-an-input-string-contains-a-number-in-javascript
      if (/\d/.test(prevTitle) || prevTitle === 'New Assignment') { // TODO: maybe more rules?
        return stringIncr(prevTitle);
      }
    }

    return 'New Assignment';
  }

  onUpdateTitle(event, title) {
    if (title === '') {
      title = this.placeholder();
    }
    this.store.updateAssignment({
      ...this.assignment,
      title
    });
  }

  // TODO: implement this on delete keyup if selected
  onDelete(event) {
    this.store.removeAssignment(this.assignment);
  }

}
