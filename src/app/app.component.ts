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
      { title: 'Analyst', level: 'Junior', desc: 'analyst junior'},
      { title: 'Dev', level: 'Junior', desc: 'dev junior'},
      { title: 'Manager', level: 'Junior', desc: 'manager junior'},
    ];
  }

  getTechnologies() {
    return [
      { name: 'C#', provider: 'Microsoft' },
      { name: 'SQL Server', provider: 'Microsoft' },
      { name: 'Oracle DB', provider: 'Oracle' },
      { name: 'Java', provider: 'Oracle' },
      { name: 'Swift', provider: 'Apple' },
      { name: 'PHP', provider: 'PHP Guy' },
      { name: 'C', provider: 'C Guy' },
      { name: 'CPP', provider: 'CPP Guy' },
      { name: 'Git', provider: 'Git' },
    ];
  }

  getFrameworks() {
    return [
      { id: 1, name: '.NET' },
      { id: 2, name: 'Laravel' },
      { id: 3, name: 'Angular' },
      { id: 4, name: 'Twitter Bootstrap' },
      { id: 5, name: 'Spring' },
      { id: 6, name: '.NET Core' },
      { id: 7, name: 'Entity Framework' },
      { id: 8, name: 'Entity Framework Core' },
      { id: 9, name: 'React' },
      { id: 10, name: 'VueJS' },
      { id: 11, name: 'AngularJS' },
      { id: 12, name: 'Rails' },
    ];
  }

  getExperience() {
    return [
      { value: '0', desc: '0-1 Years'},
      { value: '1', desc: '2-5 Years'},
      { value: '2', desc: '5+ Years'},
    ];
  }
}
