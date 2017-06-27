import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { GeomapComponent } from './geomap.component';

import { OlService } from '../_component/ol/ol.service'; // global
import { OlComponent } from '../_component/ol/ol.component';

@NgModule({
    imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    GeomapComponent,
    OlComponent
  ],

  /*
  providers are to make services and values known to DI. They are added to the root scope and they are injected to other services or directives that have them as dependency.
  */
  // https://stackoverflow.com/questions/35465533/angular2-global-service-provider
   providers: [OlService], 
  //bootstrap: [AppComponent]
})
export class TestModule { }
