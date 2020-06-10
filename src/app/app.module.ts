import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
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
  NzGridModule,
  NzInputModule,
  NzFormModule,
  NzSelectModule, NzSpinModule, NzButtonModule, NzNotificationModule
} from 'ng-zorro-antd';
import {UserService} from './services/user.service';
import {ResponsesComponent} from './components/responses/responses.component';
import {NotificationService} from './services/notification.service';
import {EncryptDecryptService} from './services/encrypt-decrypt.service';

registerLocaleData(en);
const ngZorroConfig: NzConfig = {
  notification: {nzMaxStack: 1, nzPlacement: 'bottomRight'},
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResponsesComponent,
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
    {
      provide: NZ_CONFIG, useValue: ngZorroConfig
    },
    {provide: NZ_I18N, useValue: en_US},
    UserService,
    NotificationService,
    EncryptDecryptService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
