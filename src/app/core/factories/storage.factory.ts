import { Platform } from '@ionic/angular';
import { CordovaSecureStorage } from 'ionic-appauth/lib/cordova';
import { CapacitorStorage } from 'ionic-appauth/lib/capacitor';

export let storageFactory = (platform: Platform) => {
    return platform.is('cordova') ? new CordovaSecureStorage() : new CapacitorStorage();
}