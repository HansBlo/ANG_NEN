import {Component, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {Person} from '../../entities/person.model';
import {TableService} from './table.service';
import {ButtonComponent} from './button-component/button-component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {PersonDialog} from './person-dialog/person-dialog';


@Component({
  selector: 'app-table-component',
  imports: [MatTableModule, ButtonComponent, MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,PersonDialog],
  templateUrl: './table-component.html',
  styleUrl: './table-component.css'
})
export class TableComponent implements OnInit {

  constructor(private tableService: TableService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
      this.tableService.getPersonData().subscribe((data:Person[]) => {
        this.personArray=data;
      })
  }

  personArray:Person[] = [];

  columnsToDisplay = ['id', 'vorname','nachname','alter','email','stadt','beruf','datum','aktion'];

  onCreate() {
    const dialogRef = this.dialog.open(PersonDialog, {
      width: '400px',
      data: undefined
    });

    dialogRef.afterClosed().subscribe();
  }
}
