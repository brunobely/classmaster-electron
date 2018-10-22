import { Component, OnInit, EventEmitter, Input, Output, AfterViewChecked, DoCheck, ChangeDetectorRef } from '@angular/core';

import { ContentItem } from '../../content-item';
import { CourseItem } from '../../course-item';
import { Course } from '../../course';

import * as Color from 'color';
import * as uuidv1 from 'uuid/v1';
import { StoreService } from '../../services/store/store.service';

import { remote } from 'electron';
import { ContentType } from '../../content-type';

const { Menu, MenuItem } = require('electron').remote;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, /*AfterViewChecked,*/ DoCheck {

  // TODO: Course should also not be here, just a workaround so onCourseSelect won't break for now
  // Use `instanceof` there when checking so this can be removed
  @Input() items: Array<ContentItem|CourseItem|Course>[];

  @Output() select = new EventEmitter<{ selectedItems: Array<ContentItem|CourseItem|Course>, section: number, rows: number[] }>();

  // Will be non-null when a new course is being created, saved on enter/blur and discarded on esc/blur with empty title
  // staging: boolean;

  contextMenuOpen: boolean[] = [];

  singleCourseContextMenu: Electron.Menu; // cannot just use `Menu` as that's not a type and just an object from `remote`
  multipleCourseContextMenu: Electron.Menu; // cannot just use `Menu` as that's not a type and just an object from `remote`

  constructor(public store: StoreService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {

    // this.staging = false;

    this.initContextMenus();

    // window.addEventListener('contextmenu', e => {
    //   console.log(e);

    //   // TODO: there might be a better way to do this.
    // ^ see `openContextMenu`
    //   const elements = document.querySelectorAll('li.items-row:hover');
    //   console.log(elements);
    //   if (elements.length > 0) {
    //     this.courseItemMenu.popup({ window: remote.getCurrentWindow() });
    //   }
    // });
  }

  // ngAfterViewChecked(): void {
  //   console.log('after view checked', this.staging);
  //   if (this.staging) {
  //     document.getElementById('staging').focus();
  //   }
  // }

  ngDoCheck(): void {
    console.log('do check', this.store.courses);
    if (this.store.courses && this.contextMenuOpen.length !== this.store.courses.length) {
      console.log('setting all context menus to false');
      this.contextMenuOpen = Array(this.store.courses.length).fill(false);
    }
    console.log('contextMenuOpen:', this.contextMenuOpen);
  }

  initContextMenus() {
    this.singleCourseContextMenu = new Menu();
    this.multipleCourseContextMenu = new Menu();

    // TODO: maybe make a factory function for this that takes the number of courses to be deleted?
    const deleteSingleCourseMenuItem = new MenuItem({
      label: 'Delete Course',
      click: () => {
        console.log('delete');
      }
    });

    const deleteMultipleCoursesMenuItem = new MenuItem({
      label: 'Delete Courses',
      click: () => {
        console.log('delete');
      }
    });

    this.singleCourseContextMenu.append(deleteSingleCourseMenuItem);
    this.multipleCourseContextMenu.append(deleteMultipleCoursesMenuItem);
  }

  // ! BUG: when the context menu is open, then we right-click on any course, the
  // !      contextMenuOptions callback only gets called AFTER openContextMenu, which
  // !      results in weird behavior
  openContextMenu(event, index: number) {
    console.log('event', event, 'course index', index);

    const contextMenuOptions = {
      window: remote.getCurrentWindow(),
      callback: () => {
        console.log('context menu closed');
        this.contextMenuOpen = Array(this.store.courses.length).fill(false);
        this.changeDetector.detectChanges();
      },
    };

    if (this.store.selectedCourses.length > 1 && this.store.selectedCourses.includes(index)) {
      // TODO: Update text with the number of courses selected
      this.store.selectedCourses.forEach(i => {
        this.contextMenuOpen[i] = true;
      });
      // TODO: might want different options for multiple vs single course menus
      this.multipleCourseContextMenu.popup(contextMenuOptions);
    } else {
      this.contextMenuOpen[index] = true;
      this.singleCourseContextMenu.popup(contextMenuOptions);
    }
  }

//  // TODO: clicking on new course button while staging input box is focused causes the input to disappear
//  //       on mousedown then reappear on mouseup.  Fix it, maybe by disabling the button while the input
//  //       is focused, maybe by doing something else.
  onNewCourse(event) {
    // TODO: animate new course coming in?
    console.log('new course', event);

    const i = this.store.addCourse(new Course(uuidv1(), '', Color('#777777')));
    // TODO: maybe include this in the addCourse function (or make a newCourse function, whatever)
    this.store.selectCourse(i);

    // See if this will trigger a re-render... it does!                                          <-- (or "It"?)
    // this.staging = true;
//    // ! TODO: focus the input when doing this
  }

  // // TODO: 'enter' is causing blur (maybe because the element ceases to exist?) so maybe just handle it in this function
  // // (had to add a test for `this.staging` in onStagingSave to avoid writing the file twice)
  // onStagingBlur(event, title) {
  //   console.log('blur', event, title);
  //   if (title === '') {
  //     console.log('title empty');
  //     this.onStagingCancel(null);
  //   } else {
  //     console.log('title not empty');
  //     this.onStagingSave(null, title);
  //   }
  // }

  // onStagingCancel(event) {
  //   console.log('cancel', event);
  //   this.staging = false;
  // }

  // onStagingSave(event, title) {
  //   console.log('save: event', event, 'title', title);

  //   if (this.staging && title !== '') {
  //     // TODO: pick a random accent from a few values? maybe choose based on what was already picked?
  //     const course: Course = new Course(uuidv1(), title, Color('#777777'));
  //     this.store.addCourse(course);

  //     this.staging = false;
  //   }
  // }

  // TODO: setting `event` type to Event won't allow modifier key properties. Find out what the correct type is.
  onItemSelect(event, contentType: ContentType.Schedule|ContentType.Today|ContentType.Upcoming, section: number, row: number) {
    // console.log('selectedItem:', selectedItem, 'section:', section, 'row:', row);
    // this.selected.title = selectedItem.title;
    // console.log(this.selected);

    if (!event.ctrlKey && !event.metaKey) {
      this.store.selectType(contentType);
    }

    // TODO: make this more general
    // this.select.emit({ selectedItems: [selectedItem], section, rows: [row] });

    (event.target as HTMLButtonElement).blur();
  }

  // ! TODO: use the store for selected items
  onCourseSelect(event, index: number) {
    // TODO: also make this more general

    // // TODO: see todo near top of file. Use `instanceof` here
    // this.selected = this.selected.filter(element => !this.items[0].includes(element) && !this.items[1].includes(element));

    // let selectedCourses: Array<ContentItem|CourseItem|Course> = [selectedCourse];


    // TODO: implement great multiple selection.
    // Shift and command (like finder, shift selectes from the most recently selected one to the clicked one.

    // Shouldn't interfere with Macs as if ctrl is set for toggling right-clicks, it won't fire the event (at least wouldn't here)
    // TODO: Could interfere with windows (meta key on windows?), so maybe use `CommandOrControl` from electron?
    if (event.ctrlKey || event.metaKey) {
      // The order of selected items shouldn't affect the view. Still, maybe add them in the right order later...
      if (this.store.selectedCourses.includes(index)) {
        // Remove newly clicked selectedCourse from the selection
        // selectedCourses = this.selected.filter(element => element.id !== selectedCourse.id);
        this.store.removeCourseFromSelection(index);
      } else {
        // selectedCourses.push(...this.selected);
        if (this.store.selectedType === ContentType.Course) {
          this.store.addCourseToSelection(index);
        }
      }
    } else if (event.shiftKey) {
      // TODO: for later
    } else {
      this.store.selectCourse(index);
    }

    // this.select.emit({ selectedItems: selectedCourses, section: 3, rows: [row] });

    (event.target as HTMLButtonElement).blur();
  }

  isItemSelected(item: ContentItem|CourseItem): boolean {
    // return this.selected.some(element => element.id === item.id);
    return this.store.selectedType === item.contentType;
  }

  isCourseSelected(index: number): boolean {
    // return this.selected.some(element => element.id === course.id);
    return this.store.selectedCourses.includes(index);
  }

  // TODO: figure out why isSelectedTop and isSelectedBottom get called 4 times per selection...
  isCourseSelectedTop(index: number): boolean {
    // if (this.isSelected(item)
    // && (row === 0
    // || !this.selected.includes(this.items[section][row - 1]))) {
    //   console.log('top');
    // }
    return this.isCourseSelected(index)
      && (index === 0
      || !this.store.selectedCourses.includes(index - 1));
  }

  isCourseSelectedBottom(index: number): boolean {
    // if (this.isSelected(item)
    // && (row === this.items[section].length - 1
    // || !this.selected.includes(this.items[section][row + 1]))) {
    //     console.log('bottom', item, section, row);
    // }
    return this.isCourseSelected(index)
      && (index === this.store.courses.length - 1
      || !this.store.selectedCourses.includes(index + 1));
  }

  // Decided to get rid of `sidebarOrder` in store and keeping courses in consistent order now
  // TODO: should probably remove sidebar.json
  // /**
  //  * Returns the courses from the store in the correct sidebar order
  //  */
  // courses(): Course[] {
  //   if (this.store.sidebarOrder)
  //   const courses = this.store.sidebarOrder.map(id => this.store.courses.find(c => c.id === id));
  //   console.log('courses', courses);

  //   return courses;
  // }

}
