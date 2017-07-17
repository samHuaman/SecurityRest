import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";

import { PasswordValidation } from '../../helpers/password-validation';
import { HttpRequestService } from '../../services/httprequest.service';

declare var jQuery:any;

@Component({
    selector: 'change',
    templateUrl: 'change.component.html'
})

export class ChangePasswordComponent implements OnDestroy, OnInit {

    changeForm: FormGroup;

    Username: string;
    OldPassword: string;
    NewPassword: string;    

    ResponsePost: string;

    constructor(formBuilder: FormBuilder,
                private _httpRequestService: HttpRequestService) {
        this.changeForm = formBuilder.group({
            Username: [null, Validators.required],
            OldPassword: [null, Validators.required],
            NewPassword: [null, Validators.required],
            ConfirmPassword: [null, Validators.required]
        },
        {
            validator: PasswordValidation.MatchPassword
        })
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }

    postChange() {
        let data = new URLSearchParams();
        data.append('username', this.Username);
        data.append('currentPassword', this.OldPassword);
        data.append('newPassword', this.NewPassword);

        let response: string;

        return this._httpRequestService.postWithCredentials('http://lh.com:8080/user/changePassword', data)
                .subscribe(data => {
                    this.ResponsePost = data._body;
                });
    }

}
