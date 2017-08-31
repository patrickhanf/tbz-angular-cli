import { Component, Input } from '@angular/core';
import { Title }     from '@angular/platform-browser'; // https://angular.io/guide/set-document-title
//import { UserService } from './user.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
})
export class TitleComponent {
  @Input() subtitle = '';
  @Input() title = 'title.component.ts';
  user = '';

 public constructor(private titleService: Title ) { }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

}


/*
https://angular.io/docs/ts/latest/guide/ngmodule.html#!#shared-module
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
