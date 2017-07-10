import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http"

import { Observable } from "rxjs"

import { HttpRequestService } from '../../services/httprequest.service';

@Component({
  selector: 'login',
  templateUrl: 'login.template.html',
  providers: [ FormBuilder ]
})

export class LoginComponent implements OnInit {

  message: any;

  Username: string;
  Password: string;

  loginerror: string = '';
  loginForm: FormGroup;

  constructor(private _httpRequestService: HttpRequestService,
              private router: Router,
              private http: Http,
              private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      'Username': [null, Validators.required],
      'Password': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.testPublicGet();

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser != null) {
      this.router.navigate(['/']);
    }
  }

  postLogin() {
    if (this.Username != null && this.Password != null) {
      let data = new URLSearchParams();
      data.append('username', this.Username);
      data.append('password', this.Password);

      return this.http.post('http://lh.com:8080/login', data, { withCredentials: true })
              .catch(err => {
                if (err.status === 401 || err.status === 302) {
                  this.loginerror = 'Contraseña incorrecta';
                  console.log('Intento fallido. ' + err.status);

                  this.Password = '';

                  return Observable.throw(err);
                }
                else if (err.status === 400) {
                  this.loginerror = 'Usuario no encontrado';
                  console.log('Intento fallido. ' + err.status);

                  this.Password = '';

                  return Observable.throw(err);
                }
                else if (err.status === 412) {
                  this.loginerror = 'El usuario está bloqueado por 30 minutos. Comuníquese con el Administrador';
                  console.log('Intento fallido. ' + err.status);

                  this.Password = '';

                  return Observable.throw(err);
                }
                else {
                  this.Password = '';
                  return Observable.throw(err);
                }
              })
              .subscribe(data => {
                    localStorage.setItem('currentUser', JSON.stringify({ name: this.Username }));
                    this.router.navigate(['/']);
              });
    }
  }

  testPublicGet() {
    this._httpRequestService.get('http://lh.com:8080/svc/v1/public/access')
          .subscribe(
            data => {
              this.message = data._body;
              console.log('Testing public access........................');
              console.log(this.message);
            },
            error => console.log(error),
            () => console.log('Request finished')
          );
  }

}
