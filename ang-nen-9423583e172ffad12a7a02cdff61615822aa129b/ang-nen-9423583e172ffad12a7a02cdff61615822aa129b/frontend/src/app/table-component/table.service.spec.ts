import {TableService} from './table.service';
import {Person} from '../../entities/person.model';
import {of} from 'rxjs';

describe("TableService",()=>{
  let component:TableService;
  let httpMock:any;

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
    httpMock={
      get:jest.fn().mockReturnValue(of(mockPersonData))
    };
    component=new TableService(httpMock);
  })

  describe("getPersonData",()=>{
    it("should return data from http Call",async ()=>{
      component.getPersonData().subscribe((data:any)=>{
        expect(data).toEqual(mockPersonData);
      })
    })
  })
})
