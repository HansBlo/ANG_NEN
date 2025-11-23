import { TableComponent } from './table-component';
import {TableService} from './table.service';
import {MatDialog} from '@angular/material/dialog';
import {Person} from '../../entities/person.model';
import {of} from 'rxjs';
import {PersonDialog} from './person-dialog/person-dialog';

describe('TableComponent', () => {
 let component:TableComponent;
 let tableServiceMock:any;
 let dialogMock:any;

  const mockPersonData: Person[] = [
    {
      id: 1,
      vorname: 'Anna',
      nachname: 'Müller',
      alter: '28',
      email: 'anna.mueller@example.com',
      stadt: 'Berlin',
      beruf: 'Softwareentwicklerin',
      datum: '2025-03-12'
    },
    {
      id: 2,
      vorname: 'Lukas',
      nachname: 'Schmidt',
      alter: '35',
      email: 'lukas.schmidt@example.com',
      stadt: 'München',
      beruf: 'Projektmanager',
      datum: '2024-11-05'
    },
    {
      id: 3,
      vorname: 'Sophie',
      nachname: 'Lehmann',
      alter: '22',
      email: 'sophie.lehmann@example.com',
      stadt: 'Hamburg',
      beruf: 'Studentin',
      datum: '2025-01-20'
    },
    {
      id: 4,
      vorname: 'Jonas',
      nachname: 'Weber',
      alter: '41',
      email: 'jonas.weber@example.com',
      stadt: 'Köln',
      beruf: 'Designer',
      datum: '2023-12-18'
    }
  ];

 beforeEach(()=>{
   tableServiceMock={
     getPersonData:jest.fn().mockReturnValue(of(mockPersonData)),
   }
   dialogMock = {
     open: jest.fn().mockReturnValue({
       afterClosed: jest.fn().mockReturnValue(of(true))
     })
   };
   component=new TableComponent(tableServiceMock,dialogMock);
 })

  describe("ngOnInit",()=>{
    it("should set the personArray with data from tableService.getPersonData",async ()=>{
      component.ngOnInit();

      tableServiceMock.getPersonData().subscribe((data:Person[])=>{
          expect(component.personArray).toBe(mockPersonData);
      })
    })
  })

  describe("onCreate",()=>{
    it("should open the PersonDialog",()=>{
      component.onCreate();

      expect(dialogMock.open).toHaveBeenCalledWith(PersonDialog, {
        width: '400px',
        data: undefined
      });
    })
    it("should subscribe to afterClosed",()=>{
      component.onCreate();

      expect(dialogMock.open().afterClosed).toHaveBeenCalled();
    })
  })
});
