import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';
import { HttpClientModule } from "@angular/common/http";
import { ColorPickerModule } from 'primeng/colorpicker';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';

import { AppComponent } from './app.component';
import {HttpService} from "./http.service";
import {MessageService} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartModule,
    HttpClientModule,
    ColorPickerModule,
    ButtonModule,
    ToastModule
  ],
  providers: [HttpService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
