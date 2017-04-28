import { Router } from '@angular/router';
import { environment } from './../environments/environment';
import {BackendService} from "./+rest/backend.service";
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {HttpModule, JsonpModule} from "@angular/http";

/*
 * Platform and Environment providers/directives/pipes
 */ 
import {ENV_PROVIDERS} from "./environment";
import {routing} from "./app.routing";
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

// Core providers
import {CoreModule} from "./core/core.module";
import {SmartadminLayoutModule} from "./shared/layout/layout.module";
import {LoginComponent} from "./+auth/+login/login.component";
import {AuthGuard} from "./+auth/+guards/auth.guards";
import {AuthenticationService} from "./+auth/+services/authentication.service";
import {UserService} from "./+auth/+services/user.service";
import {StorageService} from "./+common/storageLocalValues/storage.service";
import {EmpleadoService} from "./+common/service/empleado.service";
import {PushNotificationsModule} from 'angular2-notifications';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {ForgotPasswordComponent} from "./+forgot/+password/password.component";
import {MensajeRecPasswordComponent} from "./+forgot/+password/mensaje.component";
import {ValidateLinkComponent} from "./+forgot/+password/validatelink.component";
import {InvalidLinkComponent} from "./+forgot/+password/invalidlink.component";
import {ResetPasswordComponent} from "./+forgot/+password/resetpassword.component";
import {ResetPasswordMessageComponent} from "./+forgot/+password/mensajeresetpassword.component";
import {AUTH_PROVIDERS} from "angular2-jwt";
//Cambio por nueva configuración de angular2-jwt
//Uso de AuthHttp y AuthConfig
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import {NoAutorizadoComponent} from "./+auth/+noautorizado/noautorizado.component";
import { Http, RequestOptions } from '@angular/http';



// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

//Según recomendaciones de angular2-jwt
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}
export function provideBackendService(http: Http, authHttp: AuthHttp, router: Router ) {
    let localhost:  String = environment.backend;
    let port: String = environment.port;
    let url = "http://" + localhost + ":" + port;
    
    return new BackendService(url, http , authHttp, router);
}
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    	  AppComponent,
	      LoginComponent,
        NoAutorizadoComponent,
        ForgotPasswordComponent,
        MensajeRecPasswordComponent,
        ValidateLinkComponent,
        InvalidLinkComponent,
        ResetPasswordComponent,
        ResetPasswordMessageComponent,
  ],
  imports: [ // import Angular's modules
    	BrowserModule,
    	BrowserAnimationsModule,
    	FormsModule,
    	HttpModule,
	    JsonpModule,
    	CoreModule,
    	SmartadminLayoutModule,
 	    PushNotificationsModule,
      SimpleNotificationsModule,
      routing
  ],
  exports: [
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    	  AuthGuard,
        AuthenticationService,
        UserService,
        EmpleadoService,
        StorageService,
        PushNotificationsModule,
        SimpleNotificationsModule,
    	  APP_PROVIDERS,
      //Reemplazando ENV_PROVIDERS, AUTH_PROVIDERS y provideBackendService()
        {
          provide: AuthHttp,
          useFactory: authHttpServiceFactory,
          deps: [Http, RequestOptions]
        },
       {
            provide: BackendService, 
            useFactory: provideBackendService,
            deps: [Http, AuthHttp, Router]
        }
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}


}

