import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '../../services/store/store.service';
import { Assignment } from '../../assignment';

@Component({
  selector: 'app-button-strip',
  templateUrl: './button-strip.component.html',
  styleUrls: ['./button-strip.component.scss']
})
export class ButtonStripComponent implements OnInit {

  @Input() assignmentType: string;

  // TODO: generalize this for other types of button-strip?
  buttons = [
    // {
      // TODO: add 'are you sure?' confirmation when implementing this
      // Delete all of type
    // },
    {
      // Create new assignment with type
      tooltip: 'Quick add', // TODO: actually use the tooltip when hovering
      icon: { prefix: 'fas', name: 'plus' },
      handler: () => {
        console.log(`quick add: ${this.assignmentType}`);

        this.store.addAssignment(Assignment.emptyWithType(this.assignmentType));
      },
    },
    {
      // ! TODO: rename by double-clicking (or just plain clicking like the header) the name instead?
      // Rename type
      tooltip: 'Rename type',
      icon: { prefix: 'fas', name: 'pen' },
      handler: () => {
        console.log(`rename type: ${this.assignmentType}`);
      },
    },
  ];

  constructor(private store: StoreService) { }

  ngOnInit() {
  }

}
