import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from '../../../entities/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonDialogService {
  private apiUrl = "http://localhost:3000/person";

  constructor(private http: HttpClient) { }


  update(person: Person) {
    this.http.put(`${this.apiUrl}/${person.id}`, person).subscribe();
  }

  create(person: Person) {
    this.http.post(`${this.apiUrl}/`, person).subscribe();
  }
}
