import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http"

import { Observable } from "rxjs"

@Injectable()
export class HttpRequestService {

    constructor(private router: Router, private http: Http) { }

    get(url: string): Observable<any> {
        return this.http.get(url)
                .map(res => res)
                .catch(err => {
                    if (err.status === 401 || err.status === 302) {
                        return this.unauthorised();
                    }
                    else if (err.status === 403) {
                        return this.forbidden();
                    }
                    else {
                        return Observable.throw(err);
                    }
                });
    }

    post(url: string, params: URLSearchParams): Observable<any> {
        return this.http.post(url, params)
                .map(res => res)
                .catch(err => {
                    if (err.status === 401 || err.status === 302) {
                        return this.unauthorised();
                    }
                    else if (err.status === 403) {
                        return this.forbidden();
                    }
                    else {
                        return Observable.throw(err);
                    }
                });
    }

    getWithCredentials(url: string): Observable<any> {
        return this.http.get(url, { withCredentials: true })
                .map(res => res)
                .catch(err => {
                    if (err.status === 401 || err.status === 302) {
                        return this.unauthorised();
                    }
                    else if (err.status === 403) {
                        return this.forbidden();
                    }
                    else {
                        return Observable.throw(err);
                    }
                });
    }

    postWithCredentials(url: string, params: URLSearchParams): Observable<any> {
        return this.http.post(url, params, { withCredentials: true })
                .map(res => res)
                .catch(err => {
                    if (err.status === 401 || err.status === 302) {
                        return this.unauthorised();
                    }
                    else if (err.status === 403) {
                        return this.forbidden();
                    }
                    else {
                        return Observable.throw(err);
                    }
                });
    }

    unauthorised() {
        this.http
        .get('http://lh.com:8080/logout', { withCredentials: true })
        .subscribe(data => {
                localStorage.removeItem('currentUser');
                this.router.navigate(['/login']);
        }, error => {
            console.log(error);
        });

        return Observable.empty();
    }

    forbidden() {
        this.router.navigate(['/']);
        return Observable.empty();
    }

}