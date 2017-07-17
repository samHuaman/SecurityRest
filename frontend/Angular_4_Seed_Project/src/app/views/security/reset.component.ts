import { Component, ViewContainerRef } from '@angular/core';
import { URLSearchParams } from "@angular/http";
import copy from 'copy-to-clipboard';

import { HttpRequestService } from '../../services/httprequest.service';

@Component({
  selector: 'reset-password',
  templateUrl: 'reset.component.html'
})

export class ResetPasswordComponent {

    resetResult: string;

    Password: string;

    constructor(private _httpRequestService: HttpRequestService) {
        
    }

    copyToClipboard() {
        let text: string;
        text = this.Password;

        copy(text);
    }

    onGenerate() {
        var d = new Date();
        this.Password = 'AUTO' + d.getFullYear() + d.getMilliseconds() + Math.random().toString().slice(-8);
    }

    onSubmit(username: string) {
        if (this.Password != null) 
        {
            let _data = new URLSearchParams();
            _data.append('username', username);
            _data.append('password', this.Password);

            this._httpRequestService.postWithCredentials('http://lh.com:8080/user/resetPassword', _data)
                .subscribe(data => {
                    this.resetResult = data._body;
                },
                err => this.resetResult = 'ERROR',
                () => console.log('Request Finished'));
        }
        else {
            this.resetResult = 'WARNING';
        }
    }
}