import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from '../../entities/person.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {
  }

  getPersonData(){
    return this.http.get<Person[]>(this.apiUrl+"/person");
  }
}
