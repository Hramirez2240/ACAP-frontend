import axiosClient from '../axios';
import EnvSettings from "../EnvSettings";

import * as msal from "@azure/msal-browser";

var authority = EnvSettings.AD_AUTHORITY;
var tenantId = EnvSettings.AD_TENANT_ID;
var scope = EnvSettings.AD_SCOPE;
//authority = authority.replace("{your_tenant_id}", tenantId);
const msalConfig = {
    auth: {
        clientId: EnvSettings.AD_CLIENT_ID,
        authority: authority
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

function CallForLoginOrHandleRedirect(afterLoginSucceded) {
    
    msalInstance.handleRedirectPromise().then((tokenResponse) => {
        // Check if the tokenResponse is null
        // If the tokenResponse !== null, then you are coming back from a successful authentication redirect. 
        // If the tokenResponse === null, you are not coming back from an auth redirect.
        if (tokenResponse !== null) {
            axiosClient.interceptors.request.use(function (request) {
                const token = tokenResponse.accessToken; 
                if (token !== null) {
                    request.headers['Authorization'] = `Bearer ${token}`;
                    request.headers.common['Authorization'] = `Bearer ${token}`;
                  }
                return request;
                // tslint:disable-next-line: only-arrow-functions
                }, function (error) {
                  // Do something with request error
                  return Promise.reject(error);
                });
            console.log("Login succedd");
            afterLoginSucceded.call(undefined, tokenResponse)
        } else {
            //If this run it means that a login redirect has not happened
            //Call for Login
            getSilentToken().then(tokenResponse => {
                afterLoginSucceded(tokenResponse);
            });
           
        }
    }).catch((error) => {
        console.log("Error on handleRedirect promise ", error)
        // handle error, either in the library or coming back from the server
        throw error;
    });
}

function getSilentToken() {
    let username = localStorage.getItem("username"); 
    var currentAccount = msalInstance.getAccountByUsername(username);
    var silentRequest = {
        scopes: [scope], // scope, 
        account: currentAccount,
        forceRefresh: false,
        redirectUri: window.location.origin
    };
    //Check for Token after redirect
    let promise = msalInstance.acquireTokenSilent(silentRequest)
        .catch((error) => {
            if (error instanceof msal.InteractionRequiredAuthError
                || error.errorCode === "no_account_error"
                || error.errorCode === "no_account_in_silent_request") 
            {
                // fallback to interaction when silent call fails
                return msalInstance.acquireTokenRedirect(silentRequest);
            } else {
                console.log("Error on acquireTokenSilent ", error);
                alert("Sesión Expirada. Es necesario renovar sesión.");
                //Redirect to root
                window.location.href = window.location.origin;
            }
        });
    return promise;
}

export default CallForLoginOrHandleRedirect;
export { getSilentToken, msalInstance };