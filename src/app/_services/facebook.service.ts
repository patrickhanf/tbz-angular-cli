// https://github.com/nicolas2bert/angular2-facebook-connect/blob/master/facebook.service.ts
// https://gist.github.com/gcphost/872e798511a234ca419025337111ea16
// https://github.com/amitgoel1287/angular2-facebook/blob/master/facebooklogin.component.ts
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare const FB: any;

export class FacebookService {
    private appId: string = "1391514764273514";

    public response = new BehaviorSubject<boolean>(false);
    public data = this.response.asObservable();

    constructor() {
        this.init();
    }

    login() {
        this.init();
        FB.login()
    }

    logout() {
        FB.logout(function (response) {
            // user is now logged out
        });
    }

    init() {
        let js,
            id = 'facebook-jssdk',
            ref = document.getElementsByTagName('script')[0];

        if (document.getElementById(id)) {
            return;
        }

        js = document.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/sdk.js";

        ref.parentNode.insertBefore(js, ref);

        js.onload = results => {
            this.initSDK()
        }
    }

    initSDK() {
        FB.init({
            appId: this.appId,
            xfbml: true,
            version: 'v2.5'
        })
        this.setCallback()
    }

    setCallback() {
        FB.getLoginStatus(response => {
            console.log(response)
            this.response.next(response)
        });
    }

    viewStatus() {
        FB.getLoginStatus(response => {
            console.log(response);
        });
    }

}