import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { DataTableModule } from 'angular2-datatable';

import { RolesComponent } from "./roles.component";
import { SecDataFilterPipe } from './data-filter.pipe';

import { PeityModule } from '../../components/charts/peity';
import { SparklineModule } from '../../components/charts/sparkline';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';

@NgModule({
  declarations: [
    RolesComponent,
    SecDataFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    RouterModule,
    PeityModule,
    SparklineModule,
    IboxtoolsModule
  ],
  exports: [
    RolesComponent
  ],
})

export class SeguridadModule {
}