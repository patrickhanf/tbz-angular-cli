import { Component } from '@angular/core';
//import { Planets, PlanetsService } from './shared';
// http://www.mithunvp.com/angular-material-2-angular-cli-webpack/
// https://www.sitepoint.com/angular-2-tutorial/
// https://medium.com/front-end-hacking/getting-started-using-angular-material-2-in-an-angular-2-angular-cli-application-bbeecdf6bfe2#.fa6qj090d
// comment

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})

export class AppComponent {
   title = 'Trail Blazer go hello!';

   myClick ()
   {
   this.title = "changed?";
   }
  /*
  // http://www.mithunvp.com/angular-material-2-angular-cli-webpack/
  planetsList: Planets[] = ['what','goes','here'];
  selectedPlanet: Planets;
  constructor(
    private _planetservice: PlanetsService) {}
 
  ngOnInit() {
    this._planetservice.getPlanets().then(planets => this.planetsList = planets);
    this.selectedPlanet = new Planets();
  }
 
  showPlanetInfo(selplanet)
  {
    this.selectedPlanet = selplanet;
  }
  */
}
