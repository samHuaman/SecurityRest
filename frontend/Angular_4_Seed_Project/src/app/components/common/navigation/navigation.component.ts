import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Headers, RequestOptions, Response } from "@angular/http"
import { Observable } from "rxjs"

import { HttpRequestService } from '../../../services/httprequest.service';

import 'jquery-slimscroll';
import 'rxjs/Rx';

declare var jQuery:any;

export class Option {
    id: number;
    option_type: number;
    parent: number;
    description: string;
    url: string;
    sequence: number;
    icon: string;
    list: string;
    level: number;

    children: any[] = [];
}

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent implements OnInit {

  Nombres: string = '';
  Username: string = '';

  getBody: any = {};

  menuItems: Array<Option> = [];

  constructor(private router: Router, 
              private http: Http, 
              private _httpRequestService: HttpRequestService) {
  }

  ngAfterViewInit() {
      //jQuery('#side-menu').metisMenu();

      if (jQuery("body").hasClass('fixed-sidebar')) {
        jQuery('.sidebar-collapse').slimscroll({
          height: '100%'
        })
      }
  }

  activeRoute(routename: string): boolean{
    return this.router.url.indexOf(routename) > -1;
  }

  async ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser != null) {
      this.getUserProfile();
      await this.getMenu();
      //jQuery('#side-menu').metisMenu('dispose');
      //jQuery('#side-menu').metisMenu();

      setTimeout(() => {
        jQuery('#side-menu').metisMenu();
      }, 250);
    }
  }

  getUserProfile() {
    return this._httpRequestService.getWithCredentials('http://lh.com:8080/user/getProfile')
            .subscribe(
              data => {
                this.getBody = JSON.parse(data._body);

                this.Nombres = ''.concat(this.getBody.nombres, ' ', this.getBody.apellido_paterno, ' ', this.getBody.apellido_materno);
                this.Username = this.getBody.nombre_usuario;
              },
              error => console.log(error),
              () => console.log('Request Finished')
            );
  }

  async getMenu() {
    return this._httpRequestService.getWithCredentials('http://lh.com:8080/user/getMenu.json')
            .subscribe(
              data => {
                let myArray: any[] = [];
                myArray = JSON.parse(data._body) as any[];

                myArray.forEach(element => {
                  let option: Option = {
                    id: element.id,
                    description: element.descripcion,
                    icon: element.icon,
                    list: element.listar,
                    option_type: element.id_tipo,
                    parent: element.id_padre,
                    sequence: element.secuencia,
                    url: element.url,
                    children: [],
                    level: 1
                  };
                  
                  this.menuItems.push(option);
                });
              },
              error => console.log(error),
              () => {
                console.log('Request Finished');
              }
            );
  }

}
