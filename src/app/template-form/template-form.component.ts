import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  user: any = {
    name: null,
    email: null,
    password: null,
    newsletter: null,
    address: {
      zip: null,
      number: null,
      street: null,
      state: null,
      city: null,
      neighborhood: null
    }
  }

  constructor(private http: Http) {

  }

  save(form) {
    // console.log(form);
    this.http.post("https://httpbin.org/post", form.value)
      .subscribe(resp => console.log(resp));
  }

  lookForZip(zip, form) {
    if (zip != "") {
      this.http.get(`//viacep.com.br/ws/${zip}/json/`)
        .subscribe(data => this.populateData(data.json(), form));
    }
  }

  populateData(data, form) {
    // form.setValue({
    //   name: form.value.name,
    //   email: form.value.email,
    //   password: form.value.password,
    //   newsletter: form.value.newsletter,
    // });

    if (!data.erro == true) {
      form.form.patchValue({
        address: {
          street: data.logradouro,
          state: data.uf,
          city: data.localidade,
          neighborhood: data.bairro
        }
      });
    } else {
      console.log("Zip not found.")
    }
  }

  ngOnInit() {
  }

  verifyValidToTouched(field) {
    return !field.valid && field.touched
  }

  applyCssError(field) {
    return {
      'is-invalid': this.verifyValidToTouched(field)
    }
  }

}
