import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ROUTES } from "./app.routes";
import { AppComponent } from './app.component';

// App views
import { DashboardsModule } from "./views/dashboards/dashboards.module";
import { AppviewsModule } from "./views/appviews/appviews.module";
import { SeguridadModule } from './views/seguridad/seguridad.module';

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
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DashboardsModule,
    LayoutsModule,
    AppviewsModule,
    RouterModule.forRoot(ROUTES),
    SeguridadModule
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
