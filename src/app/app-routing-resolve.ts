
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'; // used for OAuth bearer token below   

/// https://blog.thoughtram.io/angular/2016/10/10/resolving-route-data-in-angular-2.html
/// Resolvers with dependencies, this will allow data to be loaded before the route happens

@Injectable()
export class IsLoggedIn {
  constructor( private router: Router, private authService: AuthService) {
  }

  resolve(): void {
      console.log('resolve logged in?', this.authService.isLoggedIn);
    if (this.authService.isLoggedIn) this.router.navigate(['/dashboard'])
  }
}