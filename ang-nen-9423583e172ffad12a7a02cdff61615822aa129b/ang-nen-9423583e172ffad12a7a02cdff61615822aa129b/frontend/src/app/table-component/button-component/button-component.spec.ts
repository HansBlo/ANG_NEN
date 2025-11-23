import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button-component';
import {Person} from '../../../entities/person.model';
import {PersonDialog} from '../person-dialog/person-dialog';
import {of} from 'rxjs';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let buttonServiceMock:any;
  let dialogMock:any;

  let mockPerson:Person={
    id: 1,
    vorname: 'Anna',
    nachname: 'Müller',
    alter: '28',
    email: 'anna.mueller@example.com',
    stadt: 'Berlin',
    beruf: 'Softwareentwicklerin',
    datum: '2025-03-12'
  };
  beforeEach(()=>{
    buttonServiceMock={
      deletePerson:jest.fn().mockReturnValue(of(true)),
    };
    dialogMock = {
      open: jest.fn().mockReturnValue({
        afterClosed: jest.fn().mockReturnValue(of(true))
      })
    };

    component=new ButtonComponent(buttonServiceMock,dialogMock);

    component.person=mockPerson;
  })

  describe("onDelete",()=>{
    it("should call buttonService.deletePerson with person ID",()=>{
      component.onDelete();

      expect(buttonServiceMock.deletePerson).toHaveBeenCalledWith(component.person.id);
    })
  })

  describe("onUpdate",()=>{
    it("should open the PersonDialog",()=>{
      component.onUpdate();

      expect(dialogMock.open).toHaveBeenCalledWith(PersonDialog, {
        width: '400px',
        data: {person:mockPerson}
      });
    })
    it("should subscribe to afterClosed",()=>{
      component.onUpdate();

      expect(dialogMock.open().afterClosed).toHaveBeenCalled();
    })
  })
});
