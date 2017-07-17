import { Component, ViewContainerRef, OnDestroy, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { FlotChartDirective } from '../../components/charts/flotChart';

import { HttpRequestService } from '../../services/httprequest.service';
import { ModalComponent } from '../../components/common/modal/modal.component';

declare var jQuery:any;

@Component({
    selector: 'users',
    templateUrl: 'user.component.html',
    providers: [ModalComponent]
})

export class UsersComponent implements OnInit, OnDestroy {

    public data;
    public filterQuery = '';
    public rowsOnPage = 10;
    public sortBy = 'username';
    public sortOrder: string = 'asc';

    public userSelected = '';

    constructor(private _httpRequestService: HttpRequestService,
                public toastr: ToastsManager, 
                vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }
    
    ngOnInit() {
        this._httpRequestService.getWithCredentials('http://lh.com:8080/user/getUsers.json')
            .subscribe((data) => {
                setTimeout(() => {
                    this.data = JSON.parse(data._body);
                    console.log('Request Finished');
                }, 1000);
            });
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    public selectUser(username: string) {
        this.userSelected = username;
        console.log(this.userSelected);
    }

    public unselectUser() {
        this.userSelected = '';
        console.log(this.userSelected);
    }

    showSuccess() {
        this.toastr.success('You are awesome!', 'Success!');
    }

    showError() {
        this.toastr.error('This is not good!', 'Oops!');
    }
        
    showWarning() {
        this.toastr.warning('You are being warned.', 'Alert!');
    }
        
    showInfo() {
        this.toastr.info('Just some information for you.');
    }
        
    showCustom() {
        this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
    }

    ngOnDestroy() {

    }
}