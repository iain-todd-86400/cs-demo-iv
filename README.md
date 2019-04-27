# Ionic Customer Success Demo - Identity Vault

This application shows the use of Ionic's Identity Vault within a mobile application. We assume that you have access to Ioinic's Identity Vault product. If this is not the case, please contact our sales department.

## Building

- Clone this repository
- Follow the [Ionic Native Enterprise Edition Setup instructions](https://ionicframework.com/docs/enterprise#setup) if you have not already done so
- Follow the [Ionic Native Enterprise Edition Register instructions](https://ionicframework.com/docs/enterprise#setup) from this application's root directory, using they key you have chosen to use for demo applications. If you do not have a key, contact your Ionic sales representative.
- `npm i`
- `ionic cordova platform add ios`
- `npm run build:ios`
- `ionic cordova platform add android`
- `npm run build:md`
- `npm start` - if you want to run in the browser, but you will not get Identity Vault functionality 

The application can be run in the browser via `npm start`.

A test user exists with the following credentials:

email: test@test.com
password: test

It is also possible to use a local API. See the `src/environments/environment.ts` file for details. When doing so, the [CS Demo API](https://github.com/ionic-team/cs-demo-api) will need to be running locally.

## Significant Architecture

### Authentication Service

The `AuthentationService` handles the login and logout calls to the backend API. Notice that this is _all_ that it does. It does not store any information on the currently logged in user or otherwise handle other user related calls. In a properly abstracted system, the only actions that should be caried out by the `AuthenticationService` are authentication related tasks. Thus, you may add calls to get refresh tokens or other such things to this service, but you should not add calls to change the password (that would be part of a `PasswordService`), or logic to store the state of the of the currently logged in user, which would be better handled via an `IdentityService` (outlined below).

### Identity Service

The `IdentityService` handles information about the currently logged in user and is responsible for storing the token that they need for the API calls. In some systems, this is called the `UserService` though that name is not as good (see explanation below). The `IdentityService` inherits from the `IonicIdentityVaultUser` class in order to provide the secure token storage capabilities of Ionic Identity Vault. Without identity vault, this service would use some other mechanism such as `@ionic/storage` to store the token.

*A note on naming:* I prefer `IdentityService` over `UserService` because `IdentityService` better describes what the service does. It stores is the source of truth for the identity of the current logged in user. Naming it `UserService` would tempt developers to put other "user" related stuff in there that did not apply to the identity of the currently logged in user, such as logic to handle profile changes, or user authoization logic, etc. These are all seperate concerns and thus should all be seperate services.

### Browser Auth Services

This implementation includes browser implementations of `IonicNativeAuthPlugin` and `IdentityVault` that allow the application to be run in the browser in either a development or a PWA scenario where you do not have access to the native functionality that Identity Vault relies on. 

For the sample implementation, see the files under `app/services/browser-auth`. These alternate implementations are activated via the `getPlugin()` function in `IdentityService` as such:

```TypeScript
  getPlugin(): IonicNativeAuthPlugin {
    if (this.plt.is('cordova')) {
      return super.getPlugin();
    }
    return this.browserAuthPlugin;
  }
```

If the platform is `cordova`, and thus native functionality is available, the Identity Vault plugin is used. Otherwise the application is running in an environment (dev browser, PWA, etc) that does not support direct access to navtive APIs and the alternate plugin and vault are used.
 
### Various Pages

Various pages, such as the login screen, communicate with the Identity Vault, but they do so via the `IdentityService`. This application has not abstracted too much of that logic, but you may want to.

## Without Identity Vault - no-identity-vault tag

For reference, this application started as a typical non-secure hybrid mobile application using `@ionic/storage` to store the token. If you would like to see that implementation for reference purposes, use `git` to checkout the `no-identity-vault` tag.

This is an Ionic application with authentication implemented in a fairly standard manner without anything fancy being used to secure the token. Here are the highlights:

- **AuthenticationService** - handles the http calls for `login` and `logout`
- **IdentityService** - handles the currently logged in user, including managing the token for the user via Ionic Storage
- **HTTP Interceptors** - there are two, one that gets the token and puts it the headers and another that reacts to 401 errors by redirecting to the login page

This scheme works ok for low security applictions. For higher security applications, though, it has a couple of flaws:

1. anyone who gains access to the phone has access to the application since there is no biometric locking of the token
1. anyone who gains access to the phone _could_ gain access to the token
