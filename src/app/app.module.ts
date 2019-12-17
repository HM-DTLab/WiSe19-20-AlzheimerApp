import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { JwtModule } from "@auth0/angular-jwt";
import { RegisterComponent } from './Components/register/register.component';
import { TextContentEditorComponent } from './Components/text-content-editor/text-content-editor.component';
import { QuillModule } from 'ngx-quill';

import { AppComponent } from './Components/app-component/app.component';
import { ContentOverviewComponent } from './Components/content-overview/content-overview.component';
import { TextContentComponent } from './Components/text-content/text-content.component';
import { QrCodePageComponent } from './Components/qr-code-page/qr-code-page.component';
import { LoginComponent } from './Components/login/login.component';
import { AppRoutingModule } from './app-routing.module';

const tokenGetter = function (){
  return localStorage.getItem("access_token");
};

@NgModule({
  declarations: [
    AppComponent,
    ContentOverviewComponent,
    TextContentComponent,
    QrCodePageComponent,
    LoginComponent,
    RegisterComponent,
    TextContentEditorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    QuillModule.forRoot(),
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
