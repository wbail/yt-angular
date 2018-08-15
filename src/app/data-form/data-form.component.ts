import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Http } from '@angular/http';
import { State } from '../models/state';
import { AppComponent } from 'src/app/app.component';
import { FindZipService } from '../services/find-zip.service';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  form: FormGroup;
  states: Observable<State[]>;
  positions: any[];
  techs: any[];
  experience: any[];
  frameworks: any[];

  constructor(private http: Http, private app: AppComponent, private findZip: FindZipService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      address: new FormGroup({
        zip: new FormControl(null),
        street: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        number: new FormControl(null, [Validators.required]),
        neighborhood: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
      }),
      newsletter: new FormControl(null, [Validators.pattern('true')]),
      position: new FormControl(null),
      techs: new FormControl(null),
      experience: new FormControl(null),
      frameworks: new FormControl(null)
    });

    this.states = this.app.getUfsBrazil();

    this.positions = this.app.getPositions();

    this.techs = this.app.getTechnologies();

    this.experience = this.app.getExperience(); 

    this.frameworks = this.buildFrameworks();
  }


  buildFrameworks() {
    // return this.app.getFrameworks();
    
    const values = this.app.getFrameworks();
    return values;

  }

  save() {

    if(!this.form.valid) {
      this.verifyFormValidation(this.form);
    }

    this.http.post("https://httpbin.org/post", this.form.value)
      .subscribe(resp => {
        // console.log(resp);
        this.form.reset();
      },
      (error: any) => alert('Invalid Form!'));
  }

  verifyFormValidation(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      // console.log(field);
      const control = formGroup.get(field);
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.verifyFormValidation(control);
      }
    });
  }

  lookForZip() {

    let zip = this.form.get('address.zip').value;

    if (zip !== "" && zip != null) {
      this.findZip.lookForZip(zip)
        .subscribe(data => this.populateData(data));
    }
  }

  comparePositions(pos1, pos2) {
    return pos1 && pos2 ? (pos1.title === pos2.title && pos1.desc === pos2.desc && pos1.level === pos2.level) : pos1 && pos2;
  }

  populateData(data) {
    // form.setValue({
    //   name: form.value.name,
    //   email: form.value.email,
    //   password: form.value.password,
    //   newsletter: form.value.newsletter,
    // });

    if (!data.erro == true) {
      this.form.patchValue({
        address: {
          street: data.logradouro,
          state: data.uf,
          city: data.localidade,
          neighborhood: data.bairro
        }
      });
    } else {
      alert("Zip not found.")
    }
  }

  verifyValidToTouched(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched
  }

  verifyInvalidEmail() {
    let email = this.form.get('email');
    if (email.errors) {
      return email.errors['email'] && email.touched;
    }
  }

  applyCssError(field: string) {
    return {
      'is-invalid': this.verifyValidToTouched(field)
    }
  }

  selectTechs() {
    this.form.get('techs').setValue(['C#', 'Angular', 'Git']);
  }

  selectExperience() {
    this.form.get('experience').setValue('1');
  }

}
