
import { Router, Route, NavigationEnd } from "@angular/router";
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // used for OAuth bearer token below   
import { ObservableMedia } from "@angular/flex-layout"; // https://stackoverflow.com/questions/42418280/switch-md-sidenav-mode-angular-material-2
import { MdSidenav } from '@angular/material';
import { Title }     from '@angular/platform-browser'; // https://angular.io/guide/set-document-title


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

  public routeTitle = "Home"; 

  public isAuthorized; // Where we'll store the resulting menu mode

  constructor(public auth: AuthService, public media:ObservableMedia, private router: Router,private titleService: Title  ) {
    // constructor

    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        var title = this.getTitle(router.routerState, router.routerState.root).join('-');
        console.log('title', title);
        titleService.setTitle(title);
        this.routeTitle = title;
      }
    });


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
  // collect that title data properties from all child routes
  // there might be a better way but this worked for me
  getTitle(state, parent) {
    var data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if(state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  Logout() {
    //console.log('logging out');
    this.auth.logout();
    //this.auth.isLoggedIn

  }


}
