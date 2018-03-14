import {Input, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-left-side-navigation',
  templateUrl: './left-side-navigation.component.html',
  styleUrls: ['../_admin.scss']
})

export class LeftSideNavigationComponent implements OnInit {

  contents = [{
    id: 0,
    icon: 'icon-pic-dashboard',
    text: 'Accounts',
    subContent: [{
      text: '',
      router: ''
    }],
    router: './accounts',
    isActive: false
  }];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    let self = this;
  }

  changeSlide(obj: any, index: number) {

    for (let value of this.contents) {
      if (value.id != obj.id) {
        value.isActive = false;
      }
    }
    if (obj.slide) {
      obj.isActive = !obj.isActive;
    } else {
      obj.isActive = true;
    }
    if (obj.router) {
      this.router.navigate([`${obj.router}`], {relativeTo: this.activatedRoute});
    }
  }

}
