import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {LoginComponent} from './components/login/login.component';
import {
  en_US,
  NgZorroAntdModule,
  NZ_I18N,
  NzConfig,
  NZ_CONFIG,
} from 'ng-zorro-antd';
import {UserService} from './services/user.service';
import {ResponsesComponent} from './components/responses/responses.component';
import {NotificationService} from './services/notification.service';
import {EncryptDecryptService} from './services/encrypt-decrypt.service';
import {UnauthorizeComponent} from './components/unauthorize/unauthorize.component';
import {AuthGuard} from './guards/auth.guard';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {TokenInterceptor} from './token-interceptor/token.interceptor';

registerLocaleData(en);
const ngZorroConfig: NzConfig = {
  notification: {nzMaxStack: 1, nzPlacement: 'bottomRight'},
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResponsesComponent,
    UnauthorizeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: NZ_I18N, useValue: en_US
    },
    {provide: NZ_CONFIG, useValue: ngZorroConfig},
    UserService,
    NotificationService,
    EncryptDecryptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
