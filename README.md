# ionic-appauth-ng-demo

This sample shows you how to use the [ionic-appauth](https://www.npmjs.com/package/ionic-appauth) package inside a Ionic/Cordova app. The sample is pretty straighforward.

## IdentityServer configuration

Here a sample of a native client (CODE + PKCE) configuration using IdentityServer :

```
var client = new Client
{
    ClientId = "examplemobile",
    ClientName = "Example Mobile App",
    ClientSecrets = { new Secret("39AB663A-CDDC-48B0-939D-44079DFDF71D".Sha256()) },
    AllowedGrantTypes = GrantTypes.Code,

    RequirePkce = true,
    RequireConsent = false,
    RequireClientSecret = false,    
    RefreshTokenUsage = TokenUsage.ReUse,
    AllowOfflineAccess = true

    // Cors used by Ionic: https://ionicframework.com/docs/troubleshooting/cors    
    AllowedCorsOrigins = { "http://localhost", "ionic://localhost", "http://localhost:8100" }, 

    RedirectUris =
    {
        "http://localhost:8100/implicit/authcallback", // For ionic serve local development
        "appauth://implicit/authcallback"
    },

    PostLogoutRedirectUris =
    {
        "http://localhost:8100/implicit/endsession", // For ionic serve local development
        "appauth://implicit/endsession"                 
    },

    AllowedScopes = { "openid", "profile", "email", "offline_access" },
};
```

## Ionic app configuration

In this sample, the URL scheme used by the mobile app is ```appauth://```. You can define your own URL scheme by replacing:

* ```URL_SCHEME``` variable in ```config.xml``` file;
* ```URL_SCHEME``` parameter in ```package.json``` file;
* ```redirect_url``` and ```end_session_redirect_url``` in ```environment.ts``` file;

## Launch sample

### Requirement

Prior to launch the sample you have to install the Ionic CLI. Documentation can be found [here](https://ionicframework.com/docs/intro/cli).

### Local

Once the Ionic CLI you can launch the sample locally by running:

```
npm install
ionic serve
```

More details about how to run an Ionic locally can be found [here](https://ionicframework.com/docs/developing/previewing).

### Android

```
ionic cordova platform add android
ionic cordova prepare android
ionic cordova run android
```

More details about how to run an Ionic on an Android device can be found [here](https://ionicframework.com/docs/developing/android).

### iOS

***TODO***

More details about how to run an Ionic on an iOS device can be found [here](https://ionicframework.com/docs/developing/ios).