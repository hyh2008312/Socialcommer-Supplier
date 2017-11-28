import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { Store, Product, Image } from '../../store';

@Component({
  selector: 'app-store-template-3-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['../store-template-3.scss']
})

export class StoreDetailComponent implements OnInit {

  public shareLink: string;
  public text = '';
  store: Store = new Store();
  product: Product = new Product();
  image: any = [];
  selectedImage: any = false;
  imageSources: string[] = [];

  constructor(
    public router: Router,
    private activatedRouter: ActivatedRoute,
    private storeService: StoreService
  ) {
    let self = this;
    this.storeService.store.subscribe((data) => {
      if(data) {
        self.store = data;
      }
    });
  }

  ngOnInit():void {
    this.shareLink = window.location.href;

    let id = this.activatedRouter.snapshot.params['id'];
    let self = this;
    this.storeService.getProduct(id).then((data) => {
      self.product = data;
      self.text = data.title;
      self.storeService.addTitleDescription({
        title: data.name,
        description: data.description,
        shareImage: data.imageUrl[0]
      });
      self.image = data.imageUrl;

      if(data.imageUrl.length > 0) {
        self.selectedImage = data.imageUrl[0];
        self.imageSources = [];
        self.imageSources = [...data.imageUrl];
      }

      self.storeService.pageView({
        pageType: 'product',
        viewTime: new Date().getTime(),
        productId: data.id,
        storeId: data.storeId
      });
    });
  }

  close():void {
    this.router.navigate([`./store/${this.store.displayName}`]);
  }

  openLink() {
    let id = this.activatedRouter.snapshot.params['id'];
    this.storeService.buttonClick({
      viewTime: new Date().getTime(),
      relationId: id,
      storeId: this.store.id
    });
  }

}