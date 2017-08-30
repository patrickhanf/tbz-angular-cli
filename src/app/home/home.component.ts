
import { Router, Route } from "@angular/router";
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // used for OAuth bearer token below   
import { ObservableMedia } from "@angular/flex-layout"; // https://stackoverflow.com/questions/42418280/switch-md-sidenav-mode-angular-material-2
import { MdSidenav } from '@angular/material';

@Component({

  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    
    @ViewChild('start') sidenavStart: MdSidenav;
  public viewRoutes = []; // https://stackoverflow.com/questions/37569936/how-to-list-output-all-routes-in-routes-in-my-angular2-app

  @ViewChild('wrapper')
  private wrapperElement: ElementRef;

  public menuMode = "side"; // Where we'll store the resulting menu mode

  public isAuthorized; // Where we'll store the resulting menu mode

  constructor(public auth: AuthService, public media:ObservableMedia ) {
    // constructor
  }

  ngOnInit() {
    this.menuMode = "side"; // Where we'll store the resulting menu mode
  }

ngAfterViewInit() {
     
  if (this.media.isActive('xs') || this.media.isActive('sm')){
        this.menuMode = "over";
        this.sidenavStart.close();
        }

	this.media.subscribe(change => { 

    console.log('media?', change);
     
    if (this.media.isActive('xs') || this.media.isActive('sm')){
        this.sidenavStart.close();
        this.menuMode = "over";
        }
    else{
        this.menuMode = "side";
        this.sidenavStart.open();
    }  
  
  });
}


  Logout() {
    //console.log('logging out');
    this.auth.logout();
    //this.auth.isLoggedIn

  }


}
