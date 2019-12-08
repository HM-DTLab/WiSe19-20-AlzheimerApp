import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentOverviewComponent } from './content-overview/content-overview.component';
import { TextContentComponent } from './text-content/text-content.component';
import { QrCodePageComponent } from './qr-code-page/qr-code-page.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { JwtModule } from "@auth0/angular-jwt";

const tokenGetter = function (){
  return localStorage.getItem("access_token");
};

@NgModule({
  declarations: [
    AppComponent,
    ContentOverviewComponent,
    TextContentComponent,
    QrCodePageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["https://plxmvji4k4.execute-api.eu-central-1.amazonaws.com/api", 
        "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_77EViVvtH"],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
