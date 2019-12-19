import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-pqs';

  constructor(
    private router: Router
  ){};

  ngOnInit(){

  }
}
