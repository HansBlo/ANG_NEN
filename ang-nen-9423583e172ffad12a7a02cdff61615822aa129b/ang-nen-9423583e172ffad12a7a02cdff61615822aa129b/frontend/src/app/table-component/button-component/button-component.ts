import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {ButtonService} from './button.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Person} from '../../../entities/person.model';
import {PersonDialog} from '../person-dialog/person-dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-button-component',
  imports: [MatButtonModule, MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,PersonDialog],
  templateUrl: './button-component.html',
  styleUrl: './button-component.css'
})
export class ButtonComponent {
  @Input() person: any;

  constructor(private buttonService: ButtonService, private dialog: MatDialog) {
  }

  onDelete() {
    this.buttonService.deletePerson(this.person.id).subscribe();
  }

  onUpdate() {
    const person=this.person;
    const dialogRef = this.dialog.open(PersonDialog, {
      width: '400px',
      data: {person}
    });

    dialogRef.afterClosed().subscribe();
  }
}
