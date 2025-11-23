import {of} from 'rxjs';
import {ButtonService} from './button.service';

describe("ButtonService",()=>{
  let component:ButtonService;
  let httpMock:any;

  beforeEach(()=>{
    httpMock={
      delete:jest.fn().mockReturnValue(of(true)),
    };
    component=new ButtonService(httpMock);
  })

  describe("deletePerson",()=>{
    it("should return true after delete",async ()=>{
      component.deletePerson(1).subscribe((data)=>{
        expect(data).toBe(true);
      })
    })
  })
})
