import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { ContentItem } from '../../content-item';
import { CourseItem } from '../../course-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() items: Array<ContentItem|CourseItem>[];
  @Input() selected: Array<ContentItem|CourseItem>;

  @Output() select = new EventEmitter<{ selectedItems: Array<ContentItem|CourseItem>, section: number, rows: number[] }>();

  constructor() { }

  ngOnInit() {
    console.log(this.selected);
  }

  // TODO: setting `event` type to Event won't allow modifier key properties. Find out what the correct type is.
  onSelect(event, selectedItem: ContentItem|CourseItem, section: number, row: number) {
    // console.log('selectedItem:', selectedItem, 'section:', section, 'row:', row);
    // this.selected.title = selectedItem.title;
    // console.log(this.selected);

    // TODO: make this more general
    if (section < 2) {
      this.select.emit({ selectedItems: [selectedItem], section, rows: [row] });
    } else {
      // TODO: also make this more general
      this.selected = this.selected.filter(element => !this.items[0].includes(element) && !this.items[1].includes(element));

      let selectedItems = [selectedItem];

      // TODO: implement great multiple selection.
      // Shift and command (like finder, shift selectes from the most recently selected one to the clicked one.

      // Shouldn't interfere with Macs as if ctrl is set for toggling right-clicks, it won't fire the event (at least wouldn't here)
      if (event.ctrlKey || event.metaKey) {
        // The order of selected items shouldn't affect the view. Still, maybe add them in the right order later...
        if (this.selected.includes(selectedItem)) {
          selectedItems = this.selected.filter(element => element.id !== selectedItem.id);
        } else {
          selectedItems.push(...this.selected);
        }
      }
      if (event.shiftKey) {
        // TODO: for later
      }

      this.select.emit({ selectedItems, section, rows: [row] });
    }

    (event.target as HTMLButtonElement).blur();
  }

  isSelected(item: ContentItem|CourseItem): boolean {
    return this.selected.some(element => element.id === item.id);
  }

  // TODO: figure out why isSelectedTop and isSelectedBottom get called 4 times per selection...
  isSelectedTop(item: ContentItem|CourseItem, section: number, row: number): boolean {
    // if (this.isSelected(item)
    // && (row === 0
    // || !this.selected.includes(this.items[section][row - 1]))) {
    //   console.log('top');
    // }
    return this.isSelected(item)
      && (row === 0
      || !this.selected.includes(this.items[section][row - 1]));
  }

  isSelectedBottom(item: ContentItem|CourseItem, section: number, row: number): boolean {
    // if (this.isSelected(item)
    // && (row === this.items[section].length - 1
    // || !this.selected.includes(this.items[section][row + 1]))) {
    //     console.log('bottom', item, section, row);
    // }
    return this.isSelected(item)
      && (row === this.items[section].length - 1
      || !this.selected.includes(this.items[section][row + 1]));
  }

}
