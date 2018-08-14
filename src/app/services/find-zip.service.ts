import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class FindZipService {

  constructor(private http: HttpClient) { }

  lookForZip(zip: string) {
    if (zip !== '' && zip != null) {
      return this.http.get(`//viacep.com.br/ws/${zip}/json/`);
    }

    return of({});
    
  }
}
