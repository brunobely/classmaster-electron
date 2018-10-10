import { Component, OnInit } from '@angular/core';

import { ContentItem } from '../../content-item';
import { CourseItem } from '../../course-item';

import { MOCK_ITEMS } from '../../mock-items';

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

  constructor() { }

  ngOnInit() {
    this.selectedSection = 0;
    this.selectedRows = [0];
    this.selectedItems = this.contentItems[this.selectedSection].filter((_, i) => this.selectedRows.includes(i));
  }

  changeSelection(event) {
    // console.log('item:', event);
    this.selectedItems = event.selectedItems;
    this.selectedSection = event.section;
    this.selectedRows = event.rows;
  }

  // TODO: try nested two-way binding instead
  updateItem(item: ContentItem|CourseItem) {
    // ! TODO: do all other matches in app on id as well instead of name
    // already done for the sidebar template
    let index = this.contentItems[this.selectedSection].findIndex(i => i.id === item.id);
    this.contentItems[this.selectedSection][index] = item;
    index = this.selectedItems.findIndex(i => i.id === item.id);
    this.selectedItems[index] = item;
  }

}
