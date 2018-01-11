import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, ViewChild} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {ViewScrollTopDirective} from '../../../shared/directives/view-scroll-top/view-scroll-top.directive';

@Component({
  selector: 'app-store-template-5-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../store-template-5.scss']
})

export class StoreNavigationComponent implements OnInit, OnChanges {

  @Input() isBlack = false;
  @Input() type: number;
  @Input() categories: any;
  @Input() storeName: string;
  @Output() public routerChange: EventEmitter<any> = new EventEmitter();
  @ViewChild(ViewScrollTopDirective) scrollTopDirective: ViewScrollTopDirective;

  isShowMore: boolean = false; // 是否显示more的按钮
  isShowMoreCategory: boolean = false;
  routerObservable: any;
  contents = [{
    text: 'HOME',
    link: './',
    exact: true
  }, {
    text: 'BLOG',
    link: './blog',
    exact: true
  }];
  showCategory: any = [];
  moreCategory: any = [];

  constructor(public router: Router) {
  }

  isFirstLoad: boolean = true;

  ngOnChanges(): void {
    let self = this;
    if (self.categories != null && self.categories.length != 0) {
      if (self.isFirstLoad) {
        self.isFirstLoad = false;
        if (self.categories.length <= 6) {
          self.showCategory = self.categories;
          self.isShowMore = false;
        } else {
          self.isShowMore = true;
          for (let i = 0; i < self.categories.length; i++) {
            if (i <= 4) {
              self.showCategory.push(self.categories[i]);
            } else {
              self.moreCategory.push(self.categories[i])
            }

          }
        }
      }
    }
  }


  ngOnInit(): void {
    let self = this;
    self.routerObservable = self.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) { // 当导航成功结束时执行
          self.routerChange.emit();
          if (this.scrollTopDirective)
            this.scrollTopDirective.setScrollTop();
        }
      });
  }

  ngOnDestroy() {
    if (this.routerObservable) {
      this.routerObservable.unsubscribe();
    }
  }

  changeShowMoreCategory(): void {
    this.isShowMoreCategory = !this.isShowMoreCategory;
  }

}