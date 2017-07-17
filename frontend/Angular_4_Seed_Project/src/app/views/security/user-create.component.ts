import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { URLSearchParams } from "@angular/http";
/*import { IMyOptions, MyDatePicker } from 'mydatepicker/src/my-date-picker';*/

import { FlotChartDirective } from '../../components/charts/flotChart';

import { GlobalValidator } from '../../helpers/global-validators';
import { HttpRequestService } from '../../services/httprequest.service';
import { ModalComponent } from '../../components/common/modal/modal.component';
import { EmailValidation } from '../../helpers/password-validation';

declare var jQuery:any;

@Component({
    selector: 'user-create',
    templateUrl: 'user-create.component.html',
    providers: [FormBuilder, ModalComponent]
})

export class UserCreateComponent implements OnInit {

    Username: string = '';
    Firstname: string = '';
    Lastname: string = '';
    ExpireDate: string = '';
    Email: string = '';
    ConfirmEmail: string = '';
    Password: string = '';
    DaysEnabled: number;

    createForm: FormGroup;
    date: Date = new Date();

    /*@ViewChild('mydp') mydp: MyDatePicker;*/

    constructor(private _httpRequestService: HttpRequestService,
                private router: Router,
                private formBuilder: FormBuilder) {
        this.createForm = formBuilder.group({
            'Username': [null, Validators.required],
            'Firstname': [null, Validators.required],
            'Lastname': [null, Validators.required],
            'ExpireDate': [null, Validators.required],
            'Email': [null, Validators.compose([Validators.required, Validators.email])],
            'ConfirmEmail': [null, Validators.compose([Validators.required, Validators.email])],
            'DaysEnabled': [null, Validators.required],
            'Password': [null, Validators.required]
        },
        {
            validator: EmailValidation.MatchEmail
        });
    }

    ngOnInit() {

    }

    generatePassword() {
        var d = new Date();
        this.Password = 'AUTO' + d.getFullYear() + d.getMilliseconds() + Math.random().toString().slice(-8);
    }

    postCreate() {
        if (this.createForm.valid == true) {
            let data = new URLSearchParams();
            let email_confirmed: string = '0';

            if (this.Email == this.ConfirmEmail) {
                email_confirmed = '1';
            }

            data.append('username', this.Username);
            data.append('p_password', this.Password);
            data.append('user_expired_date', this.ExpireDate);
            data.append('email', this.Email);
            data.append('email_confirmed', email_confirmed);
            data.append('firstname', this.Firstname);
            data.append('lastname', this.Lastname);
            data.append('days_enabled', this.DaysEnabled.toString());

            this._httpRequestService.postWithCredentials('http://lh.com:8080/user/saveUser', data)
                .subscribe(_data => {
                    console.log(_data._body);
                });
        }
    }

   /* private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd-mm-yyyy'
    };

    private model: Object = { 
        date: { 
            year: this.date.getFullYear(), 
            month: this.date.getMonth(), 
            day: this.date.getDay()
        } 
    };*/

}