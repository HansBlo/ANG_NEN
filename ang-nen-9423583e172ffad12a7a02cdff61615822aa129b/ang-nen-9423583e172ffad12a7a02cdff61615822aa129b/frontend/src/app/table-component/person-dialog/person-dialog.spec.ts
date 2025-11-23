import { PersonDialog } from './person-dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {dateTimestampProvider} from 'rxjs/internal/scheduler/dateTimestampProvider';

describe('PersonDialog', () => {
  let component: PersonDialog;
  let formBuilder:FormBuilder;
  let personDialogServiceMock:any;
  let dialogRefMock:any;
  let dataMock:any;

  beforeEach(() => {
    formBuilder = new FormBuilder();

    personDialogServiceMock={
      update:jest.fn(),
      create:jest.fn(),
    };

    dialogRefMock={
      close:jest.fn(),
    };

    dataMock={
      person: {
        id: 1,
        vorname: 'Anna',
        nachname: 'Müller',
        alter: '28',
        email: 'anna.mueller@example.com',
        stadt: 'Berlin',
        beruf: 'Softwareentwicklerin',
        datum: '2025-03-12'
      }
    };

    component=new PersonDialog(formBuilder,personDialogServiceMock,dialogRefMock,dataMock);
  })

  describe('constructor', () => {
    it('should set component.update to true if data is defined', () => {
      expect(component.update).toBe(true);
    })
    it('should set the component.form to the sent data',()=>{
      expect(component.form.value).toEqual(dataMock.person);
    })
    it('should set component.update to false if data is undefined', () => {
      component=new PersonDialog(formBuilder,personDialogServiceMock,dialogRefMock,undefined);

      expect(component.update).toBe(false);
    })
    it('should set the component.form to empty form if data is undefined', () => {
      jest.spyOn(dateTimestampProvider, 'now').mockReturnValue(123456789);

      component=new PersonDialog(formBuilder,personDialogServiceMock,dialogRefMock,undefined);

      expect(component.form.value).toEqual({
        id: null,
        vorname:"",
        nachname:"",
        alter: 0,
        email: "",
        stadt:"",
        beruf:"",
        datum:123456789,
      });
    })
  })

  describe('save', () => {
    it('should run personDialogService.update if the form is valid and update is true',()=>{
      component.save();

      expect(personDialogServiceMock.update).toHaveBeenCalledWith(dataMock.person);
    })
    it('should run personDialogService.create if the form is valid and update is false',()=>{
      component=new PersonDialog(formBuilder,personDialogServiceMock,dialogRefMock,undefined);
      component.form=formBuilder.group({
        id: [dataMock.person.id],
        vorname:[dataMock.person.vorname,Validators.required],
        nachname:[dataMock.person.nachname,Validators.required],
        alter: [dataMock.person.alter, [Validators.required, Validators.min(0)]],
        email: [dataMock.person.email, [Validators.email]],
        stadt:[dataMock.person.stadt, [Validators.required]],
        beruf:[dataMock.person.beruf, [Validators.required]],
        datum:[dataMock.person.datum],
      })

      component.save();

      expect(personDialogServiceMock.create).toHaveBeenCalledWith(dataMock.person);
    })
    it('should call component.dialogRef.close with the form value if the form is valid',()=>{
      component.save();

      expect(dialogRefMock.close).toHaveBeenCalledWith(component.form.value);
    })
    it('should log "Not Valid" if the form is invalid',()=>{
      component=new PersonDialog(formBuilder,personDialogServiceMock,dialogRefMock,undefined);
      const spy=jest.spyOn(console,"log");
      component.save();

      expect(spy).toHaveBeenCalledWith("Not Valid");
    })
  })

  describe('cancel', () => {
    it('should close the dialogRef',()=>{
      component.cancel();

      expect(dialogRefMock.close).toHaveBeenCalled();
    })
  })
});
