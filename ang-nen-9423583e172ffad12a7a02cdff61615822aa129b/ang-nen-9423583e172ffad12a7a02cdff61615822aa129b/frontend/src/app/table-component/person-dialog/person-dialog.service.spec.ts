import {PersonDialogService} from './person-dialog.service';
import {of} from 'rxjs';

describe('PersonDialogService', () => {
  let service: PersonDialogService;
  let httpMock:any;

  const apiUrl = "http://localhost:3000/person";

  const personMock={
    id: 1,
    vorname: 'Anna',
    nachname: 'Müller',
    alter: '28',
    email: 'anna.mueller@example.com',
    stadt: 'Berlin',
    beruf: 'Softwareentwicklerin',
    datum: '2025-03-12'
  }

  beforeEach(() => {
    httpMock={
      put:jest.fn().mockReturnValue(of({})),
      post:jest.fn().mockReturnValue(of({}))
    };

    service=new PersonDialogService(httpMock);
  })

  describe('update()', () => {
    it('should sent a put request with the person to the server', () => {
      const spy=jest.spyOn(httpMock,"put");

      service.update(personMock);

      expect(spy).toHaveBeenCalledWith(`${apiUrl}/${1}`, personMock);
    })
  })

  describe('create()', () => {
    it('should sent a post request with the person to the server', () => {
      const spy=jest.spyOn(httpMock,"post");

      service.create(personMock);

      expect(spy).toHaveBeenCalledWith(`${apiUrl}/`, personMock);
    })
  })
})
