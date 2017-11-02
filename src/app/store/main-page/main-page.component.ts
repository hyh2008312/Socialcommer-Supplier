import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { StoreService } from '../store.service';

import { Store, Product } from '../store';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['../store.scss']
})

export class MainPageComponent implements OnInit {

  public categories:any = [];
  public category: any = {
    id: null,
    name : ''
  };
  public shareLink: string;
  public text = 'Here you let your customers get to know you. Tell them a little bit about yourself and why you create this business.'
  + 'Do you have a passion, hobby or life experience that inspired you to get started? Do you have special skills or training'
  + 'that make you an expert in your field? Show your customers that there are read people with instersting stories working'
  + 'behind the scenes. Helping customers feel connected to you and your purpose will inspire more trust you brad.';

  store: Store = new Store();
  page = 1;
  product: any = [];

  queryMedia: any;
  isMobile: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private media: ObservableMedia
  ) {
    let storeName = this.activatedRoute.snapshot.params['name'];
    let self = this;
    this.storeService.getStore(storeName).then((data) => {
      self.store = data;
      self.categories = [...data.category];
      self.category = self.categories[0];

      self.queryProduct();
    });

    self.queryMedia = this.media.asObservable()
      .subscribe((data) => {
        if(data.mqAlias == 'xs') {
          self.isMobile = true;
        } else {
          self.isMobile = false;
        }

      });
  }

  ngOnInit():void {
    this.shareLink = window.location.href;
  }

  jumpList():void {

    if(this.isMobile) {
      let storeName = this.activatedRoute.snapshot.params['name'];
      this.router.navigate([`store/${storeName}/list`]);
    } else {
      this.page++;
      this.queryProduct();
    }
  }

  changeCategory() {
    this.page = 1;
    this.product = [];
    this.queryProduct();
  }

  queryProduct() {
    let options = {
      categoryId: this.category.id,
      storeId: this.store.id,
      relationStatus: 'published',
      page: this.page,
      page_size: 12
    };
    let self = this;
    self.storeService.getProductList(options).then((data)=>{
      self.product = self.product.concat(data.results);
      console.log(self.product)
    });
  }

  ngOnDestroy() {
    this.queryMedia.unsubscribe();
  }

}
