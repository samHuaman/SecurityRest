import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DropdownModule } from 'ng2-dropdown';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ROUTES } from "./app.routes";
import { AppComponent } from './app.component';
import { MyDatePickerModule } from 'mydatepicker/src/my-date-picker';

// App views
import { DashboardsModule } from "./views/dashboards/dashboards.module";
import { AppviewsModule } from "./views/appviews/appviews.module";
import { SecurityModule } from './views/security/security.module';

// App modules/components
import { LayoutsModule } from "./components/common/layouts/layouts.module";

import { AuthGuard } from './helpers/authguard';

import { HttpRequestService } from './services/httprequest.service';
import { MenuService } from './services/menu.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    HttpModule,
    DashboardsModule,
    LayoutsModule,
    AppviewsModule,
    RouterModule.forRoot(ROUTES),
    SecurityModule,
    DropdownModule,
    Ng2Bs3ModalModule,
    ToastModule.forRoot()
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    HttpRequestService,
    MenuService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
