import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentOverviewComponent } from './content-overview/content-overview.component';
import { TextContentButtonComponent } from './text-content-button/text-content-button.component';
import { TextContentComponent } from './text-content/text-content.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentOverviewComponent,
    TextContentButtonComponent,
    TextContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
