import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ContentOverviewComponent } from './Components/content-overview/content-overview.component';
import { TextContentComponent } from './Components/text-content/text-content.component';
import { QrCodePageComponent } from './Components/qr-code-page/qr-code-page.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthorisationGuardService } from './Services/authorisation-guard.service';
import { RegisterComponent } from './Components/register/register.component';
import { QrCodeGenerationComponent } from './Components/qr-code-generation/qr-code-generation.component';

/**
 * Objekt definiert die Routen der App, bspw wird bei Eingabe von localhost:4200/overview auf
 * den Content-Overview Komponeneten gelinkt. Redirects sind auch möglich.
 */
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'start', component: QrCodePageComponent, canActivate: [AuthorisationGuardService] },
  { path: 'generate', component: QrCodeGenerationComponent, canActivate: [AuthorisationGuardService] },
  { path: 'overview/:id', component: ContentOverviewComponent, canActivate: [AuthorisationGuardService] },
  { path: 'text-content/:id', component: TextContentComponent, canActivate: [AuthorisationGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
