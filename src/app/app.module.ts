import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentOverviewComponent } from './content-overview/content-overview.component';
import { TextContentButtonComponent } from './text-content-button/text-content-button.component';
import { TextContentComponent } from './text-content/text-content.component';
import { QrCodePageComponent } from './qr-code-page/qr-code-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentOverviewComponent,
    TextContentButtonComponent,
    TextContentComponent,
    QrCodePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
