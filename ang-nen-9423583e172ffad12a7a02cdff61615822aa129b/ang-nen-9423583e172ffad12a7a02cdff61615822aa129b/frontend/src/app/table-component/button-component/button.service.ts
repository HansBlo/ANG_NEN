import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {
  private apiUrl = "http://localhost:3000/person";

  constructor(private http: HttpClient) { }

  deletePerson(id:number){
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
