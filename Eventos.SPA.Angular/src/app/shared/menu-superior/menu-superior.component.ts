import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html'
})
export class MenuSuperiorComponent implements OnInit {

  constructor() { }
  isCollapsed: boolean = true;
  ngOnInit() {
  }
}
