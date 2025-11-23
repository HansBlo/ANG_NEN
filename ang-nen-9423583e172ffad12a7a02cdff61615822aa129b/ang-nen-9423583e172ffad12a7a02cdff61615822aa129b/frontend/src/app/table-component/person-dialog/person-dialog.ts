import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {PersonDialogService} from './person-dialog.service';
import {Person} from '../../../entities/person.model';
import {dateTimestampProvider} from 'rxjs/internal/scheduler/dateTimestampProvider';

@Component({
  selector: 'app-person-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './person-dialog.html',
  styleUrl: './person-dialog.css'
})
export class PersonDialog {
  form: FormGroup;
  update:boolean=false;

  constructor(
    private fb: FormBuilder,
    private personDialogService:PersonDialogService,
    private dialogRef: MatDialogRef<PersonDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(data!=undefined){
      this.update=true;
      this.form = this.fb.group({
        id: [data.person.id],
        vorname:[data.person.vorname,Validators.required],
        nachname:[data.person.nachname,Validators.required],
        alter: [data.person.alter, [Validators.required, Validators.min(0)]],
        email: [data.person.email, [Validators.email]],
        stadt:[data.person.stadt, [Validators.required]],
        beruf:[data.person.beruf, [Validators.required]],
        datum:[data.person.datum],
      });
    }else{
      this.form = this.fb.group({
        id: [],
        vorname:["",Validators.required],
        nachname:["",Validators.required],
        alter: [0, [Validators.required, Validators.min(0)]],
        email: ["", [Validators.email]],
        stadt:["", [Validators.required]],
        beruf:["", [Validators.required]],
        datum:[dateTimestampProvider.now()],
      });
    }
  }

  save() {
    if (this.form.valid) {
      const person:Person = this.form.value;
      if(this.update){
        this.personDialogService.update(person);
      }else{
        this.personDialogService.create(person);
      }
      this.dialogRef.close(this.form.value);
    }
    else{
      console.log("Not Valid");
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
