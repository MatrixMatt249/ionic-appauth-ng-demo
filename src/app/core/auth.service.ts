import { Platform } from '@ionic/angular';
import { Injectable, NgZone } from '@angular/core';

import { IonicAuth, IonicAuthorizationRequestHandler, DefaultBrowser} from 'ionic-appauth';
import { CordovaRequestorService } from './cordova/cordova-requestor.service';
import { BrowserService } from './cordova/browser.service';
import { SecureStorageService } from './cordova/secure-storage.service';
import { StorageService } from './angular/storage.service';
import { RequestorService } from './angular/requestor.service';
import { IonicImplicitRequestHandler } from 'ionic-appauth/lib/implicit-request-handler';

const TOKEN_RESPONSE_KEY = 'token_response';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends IonicAuth  {

  constructor(
    requestor : RequestorService,
    cordovaRequestor : CordovaRequestorService,
    secureStorage : SecureStorageService,
    storage : StorageService,
    browser : BrowserService,
    private platform : Platform,
    private ngZone: NgZone,
  ){
    super(
      (platform.is('cordova')) ? browser : undefined,
      (platform.is('cordova')) ? secureStorage : storage,
      (platform.is('cordova')) ? cordovaRequestor : requestor,
      undefined, undefined,
      (platform.is('cordova')) ? new IonicAuthorizationRequestHandler(browser, secureStorage) : new IonicImplicitRequestHandler(new DefaultBrowser(), storage)
    );

    this.addConfig();
  }

  public async startUpAsync() {
    if(this.platform.is("cordova")){
      (<any>window).handleOpenURL = (callbackUrl) => {  
        this.ngZone.run(() => {
            this.handleCallback(callbackUrl);
        });
      };
    }
    
    super.startUpAsync();
  }
  
  async getTokenFromStorage() {
    return await this.storage.getItem(TOKEN_RESPONSE_KEY);
  }

  private addConfig(){
    if(this.platform.is("cordova")){
      this.authConfig = { 
        identity_client: 'appAuthCode', 
        identity_server: 'https://192.68.0.1/', 
        redirect_url: 'appauth://callback', 
        scopes: 'openid profile offline_access',
        usePkce: true, 
        end_session_redirect_url: 'appauth://endSession', 
      }
    }else{
      this.authConfig = { 
        identity_client: 'appAuthImplicit', 
        identity_server: 'https://192.68.0.1/', 
        redirect_url: 'http://localhost:8100/implicit/authcallback', 
        scopes: 'openid profile offline_access',
        usePkce: false,
        end_session_redirect_url: 'http://localhost:8100/implicit/endsession', 
      }
    }
  }

  private handleCallback(callbackUrl: string): void {
    if ((callbackUrl).indexOf(this.authConfig.redirect_url) === 0){
      this.AuthorizationCallBack(callbackUrl);
    }
    
    if ((callbackUrl).indexOf(this.authConfig.end_session_redirect_url) === 0){
      this.EndSessionCallBack();
    }
  }
}
