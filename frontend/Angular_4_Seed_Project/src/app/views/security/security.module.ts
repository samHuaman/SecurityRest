import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { DropdownModule } from 'ng2-dropdown';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { DataTableModule } from 'angular2-datatable';

import { RolesComponent } from "./roles.component";
import { UsersComponent } from "./user.component";
import { UserCreateComponent } from "./user-create.component";
import { ChangePasswordComponent } from './change.component';
import { ResetPasswordComponent } from './reset.component';
import { SecDataFilterPipe } from './data-filter.pipe';
import { IboxIndexComponent } from '../../components/common/iboxtools/iboxtoolsindex.component';
import { ModalComponent } from '../../components/common/modal/modal.component';

import { PeityModule } from '../../components/charts/peity';
import { SparklineModule } from '../../components/charts/sparkline';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';

@NgModule({
  declarations: [
    RolesComponent,
    ChangePasswordComponent,
    UsersComponent,
    SecDataFilterPipe,
    ModalComponent,
    ResetPasswordComponent,
    UserCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    RouterModule,
    PeityModule,
    SparklineModule,
    IboxtoolsModule,
    DropdownModule,
    Ng2Bs3ModalModule,
    ToastModule
  ],
  exports: [
    RolesComponent,
    ChangePasswordComponent,
    UsersComponent,
    ModalComponent,
    ResetPasswordComponent,
    UserCreateComponent
  ],
})

export class SecurityModule {
}