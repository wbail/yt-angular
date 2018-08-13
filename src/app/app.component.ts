import { Component } from '@angular/core';
import { Http, Response } from '../../node_modules/@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private http: Http) { }

  getUfsBrazil() {
    return this.http.get('https://raw.githubusercontent.com/felipefdl/cidades-estados-brasil-json/master/Estados.json');
  }
}
