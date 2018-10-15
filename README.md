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