import { Component, OnInit } from '@angular/core';

import { ContentItem } from '../../content-item';
import { CourseItem } from '../../course-item';

import { MOCK_ITEMS } from '../../mock-items';
import { Course } from '../../course';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contentItems: Array<ContentItem|CourseItem>[] = MOCK_ITEMS;

  selectedSection: number; // selecting across sections is disallowed
  selectedRows: number[];
  selectedItems: Array<ContentItem|CourseItem>;

  constructor(private store: StoreService) { }

  ngOnInit() {
    this.selectedSection = 0;
    this.selectedRows = [0];
    this.selectedItems = this.contentItems[this.selectedSection].filter((_, i) => this.selectedRows.includes(i));

    this.store.load().then(success => {
      if (success) {
        console.log('loaded store');
      }
    });
    // this.userDataService.getCourses()
    //   .then(courses => {
    //     this.courses = courses;
    //     return this.userDataService.getSidebarOrder();
    //   })
    //   .then(ord => {
    //     // TODO: should order be an instance variable here? see if we need it anywhere else
    //     let order: string[];
    //     console.log('ord', ord);
    //     if (ord) {
    //       order = ord;
    //     } else {
    //       order = this.courses.map(c => c.id);
    //       this.userDataService.updateSidebarOrder(order);
    //     }
    //     this.contentItems[2] = order.map(id => CourseItem.from(this.courses.find(c => c.id === id)));
    //     console.log(this.contentItems);
    //   });
  }

  changeSelection(event) {
    // console.log('item:', event);
    this.selectedItems = event.selectedItems;
    this.selectedSection = event.section;
    this.selectedRows = event.rows;
  }

  // TODO: try nested two-way binding instead
  // updateItem(item: ContentItem|CourseItem) {
  //   // ! TODO: do all other matches in app on id as well instead of name
  //   // already done for the sidebar template
  //   let index = this.contentItems[this.selectedSection].findIndex(i => i.id === item.id);
  //   this.contentItems[this.selectedSection][index] = item;
  //   index = this.selectedItems.findIndex(i => i.id === item.id);
  //   this.selectedItems[index] = item;
  // }

}
