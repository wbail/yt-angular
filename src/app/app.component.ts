import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from './models/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private http: HttpClient) { }

  getUfsBrazil() {
    return this.http.get<State[]>('https://raw.githubusercontent.com/felipefdl/cidades-estados-brasil-json/master/Estados.json');
    // return this.http.get<State[]>('../assets/ufs.json');
  }

  getPositions() {
    return [
      { title: 'Dev', level: 'Junior', desc: 'dev junior'},
      { title: 'Analyst', level: 'Junior', desc: 'analyst junior'},
      { title: 'Manager', level: 'Junior', desc: 'manager junior'},
    ];
  }
}
