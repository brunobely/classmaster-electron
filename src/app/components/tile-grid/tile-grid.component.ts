import { Component, OnInit, DoCheck, ChangeDetectorRef } from '@angular/core';
import { StoreService } from '../../services/store/store.service';
import { Assignments } from '../../assignment';
import { thistle } from 'color-name';

@Component({
  selector: 'app-tile-grid',
  templateUrl: './tile-grid.component.html',
  styleUrls: ['./tile-grid.component.scss']
})
export class TileGridComponent implements OnInit, DoCheck {
  Object = Object;

  // TODO: generalize this. Maybe save a preferred order by course (and ask
  //       if user wants to save it for all courses when moving stuff around).
  // displayOrder: string[] = ['homework', 'exam', 'quiz'];
  order: string[];
  columnIndices: number[];

  constructor(private store: StoreService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    // Generates an array of the first displayOrder.length/2 even numbers
    // this.columnIndices = Array(Math.ceil(this.displayOrder.length / 2)).fill(0).map((_, i) => 2 * i);

    console.log(this.columnIndices);
    console.log('display order:', this.displayOrder());
    console.log('assignments:', this.assignments());
  }

  ngDoCheck(): void {
    const displayOrder = this.displayOrder();

    if (!displayOrder && this.order) {
      this.order = undefined; // or null?
      this.changeDetector.detectChanges();
      console.log('detecting changes, no more order');
    } else if (displayOrder && !this.order) {
      this.order = displayOrder;
      this.updateColumnIndices();
      this.changeDetector.detectChanges();
      console.log('detecting changes, we have an order now', this.order);
    } else if (displayOrder) {
      const hasChanged = !this.order.reduce((acc, x, i) => acc && x === displayOrder[i], true);
      if (hasChanged) {
        this.order = displayOrder;
        this.updateColumnIndices();
        this.changeDetector.detectChanges();
        console.log('detecting changes, order changed');
      }
    }
  }

  isEmpty(): boolean {
    const assignments = this.assignments();
    return !assignments || Object.keys(assignments).length === 0 || !this.order || this.order.length === 0;
  }

  displayOrder(): string[] {
    return this.store.getFirstSelected().displayOrder;
  }

  assignments(): Assignments {
    // TODO: when supporting multiple courses, maybe have an 'index' input in this so we can
    //       get the corresponding course.
    // ^ might not use the tile grid when displaying multiple

    console.log('ASSIGNMENTS', this.store.getFirstSelected().assignments);
    console.log('ORDER', this.store.getFirstSelected().displayOrder);
    console.log('this.ORDER', this.order);
    console.log('COURSE', this.store.getFirstSelected());

    return this.store.getFirstSelected().assignments;
  }

  updateColumnIndices() {
    this.columnIndices = Array(Math.ceil(this.order.length / 2)).fill(0).map((_, i) => 2 * i);
  }

  // updateDisplayOrder() {
  //   const displayOrder = [];
  //   if (this.assignments()) {
  //     for (const type of this.displayOrder) {
  //       if (type in this.assignments()) {
  //         displayOrder.push(type);
  //       }
  //     }
  //     for (const type of Object.keys(this.assignments())) {
  //       if (!displayOrder.includes(type)) {
  //         displayOrder.push(type);
  //       }
  //     }
  //   }
  //   this.displayOrder = displayOrder;
  // }

}
