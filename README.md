# Ionic Customer Success Demo - Identity Vault

This application shows the use of Ionic's Identity Vault within a mobile application. We assume that you have access to Ioinic's Identity Vault product. If this is not the case, please contact our sales department.

## Without Identity Vault - Branch `master`

This is an Ionic application with authentication implemented in a fairly standard manner without anything fancy being used to secure the token. Here are the highlights:

- **AuthenticationService** - handles the http calls for `login` and `logout`
- **IdentityService** - handles the currently logged in user, including managing the token for the user via Ionic Storage
- **HTTP Interceptors** - there are two, one that gets the token and puts it the headers and another that reacts to 401 errors by redirecting to the login page

This scheme works ok for low security applictions. For higher security applications, though, it has a couple of flaws:

1. anyone who gains access to the phone has access to the application
1. anyone who gains access to the phone _could_ gain access to the token

## With Identity Vault - Branch `feature/identityVault`

In order to build this branch, please unpack the Identity Vault package that you were supplied with and place its contents in a folder called `enterprise-auth-master` at the root of this project.

```bash
~/Projects/Demos/cs-demo-iv (feature/identityVault): ls enterprise-auth-master/
DOCUMENTATION.url                 Video-Overview-Presentation.url
Identity Vault Factsheet.pdf      Video-Using-Multiple-Tokens.url
Overview-PDF.pdf                  cordova
Overview-PowerPoint.pptx          demo
README.md                         demo-no-identity-vault
Video-HTTP-Interceptor.url        lib
Video-Implementation-Tutorial.url package.json
```

### Getting Started

```bash
npm install ./enterprise-auth-master/lib
cordova plugin add ./enterprise-auth-master/cordova/ionic-plugin-native-auth
```

### Significant Code Changes

#### Inherit from `IonicIdentityVaultUser`

There should be a service in the code that represents the currently logged in user. This service will need to be updated to inherit from `IonicIdentityVaultUser`. Any code that is specific to the non-secure storage of the token will also need to be stripped.

In the code in this repo, that service is called the `Identity` service. In other systems it may go by names like `User` or `CurrentUser`.

The first task that needs to be done is to configure Identity Vault via the constructor. Note that some of this code already existed in the `Identity` class, but calling `super` with the configuration has been added:

```TypeScript
  constructor(
    private browserAuthPlugin: BrowserAuthPlugin,
    private http: HttpClient,
    public platform: Platform,
    private router: Router
  ) {
    super(platform, {
      enableBiometrics: true,
      lockOnClose: false,
      lockAfter: 5000,
      hideScreenOnBackground: true
    });
    this.changed = new Subject();
  }
```

The `IonicIdentityVaultUser` class contains several methods that can be overridden in the child class. Here are a few of them:

- **onVaultLocked** - handle the vault being locked, generally this involves clearing the token and navigating to the login page
- **onSessionRestored** - takes a token, called when he vault is unlocked and the seesion retored, generally set the token to the one passed to the method
- **getPlugin** - gets the plugin object, useful for testing this method could also return a fully functional service to replace the plugin when the application is run in the web if running in the web is a desired outcome

#### Implement Startup Routing

The original code always started on the "Home" tab of the tabs page. The HTTP intersceptor would then redirect to the login page if the fetch failed. This required the intersceptor that placed the token in the header to work asycronously.

That strategy could still be followed in this application, but I chose instead to wait for the token to load and then act accordingly. The end result was some slightly more complex code in the tabs page and a simplified intersceptor.

#### Save the Token in the Vault

The original code contained a method to store the token using Ionic Storage. That was replaced with a method that stores the token in the Identity Vault.

#### Handle Biometric Unlocking of the Token in the Login

This is all new functionallity. The original code did not handle locking the token, and thus had no need for biometric unlocking of the token.

The login page has been modified such that if a locked token exists and biometric unlocking is enabled, a button is displayed that allows for biometric unlocking of the token.
