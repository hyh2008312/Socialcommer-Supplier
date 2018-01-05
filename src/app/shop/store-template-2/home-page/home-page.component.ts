import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-2-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../store-template-2.scss']
})

export class HomePageComponent implements OnInit {
  public categories:any = [{
    id: 0,
    name: 'All'
  }, {
    id: 0,
    name: 'Daily Specials'
  }, {
    id: 0,
    name: 'Bakery'
  }, {
    id: 0,
    name: 'Breads'
  }, {
    id: 0,
    name: 'Drinks'
  }, {
    id: 0,
    name: 'Cookies'
  }, {
    id: 0,
    name: 'Donuts'
  }];
  public category: any = {
    id: 0,
    name : 'All'
  };
  public shareLink: string;
  public text = '';

  baseImageUrl: string = 'https://media.socialcommer.com/source/web/pic/pic-2-1.jpg';

  imageUrlOne: string = 'https://media.socialcommer.com/source/web/pic/pic-2-2.jpg';
  imageHomeMade: string = 'https://media.socialcommer.com/source/web/pic/pic-2-5.jpg';
  imageSubscribe: string = 'https://media.socialcommer.com/source/web/pic/pic-2-11.jpg';
  imageOwnerThree: string = 'https://media.socialcommer.com/source/web/pic/pic-2-3.jpg';
  imageOwnerFour: string = 'https://media.socialcommer.com/source/web/pic/pic-2-4.jpg';
  imageOwnerSix: string = 'https://media.socialcommer.com/source/web/pic/pic-2-6.jpg';
  imageOwnerEleven: string = 'https://media.socialcommer.com/source/web/pic/pic-2-11.jpg';

  store: Store = new Store();
  page = 1;
  nextPage: boolean = true;
  product: any = [{
    id: 0,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/blog/cover/1c4078ad-f91f-46c4-bd13-a3d75e578f06.jpg'
  }, {
    id: 1,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-8.jpg'
  }, {
    id: 2,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-9.jpg'
  }, {
    id: 3,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-10.jpg'
  }, {
    id: 4,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/blog/cover/84e6476b-bc20-45eb-8501-62b9a9a96f0d.jpg'
  }, {
    id: 5,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-7.jpg'
  }];


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }

  ngOnInit(): void {
    this.shareLink = window.location.href;
    let self = this;
    let firstLoad = false;
    this.storeService.store.subscribe((data) => {
      if (data && !firstLoad) {
        firstLoad = true;
        self.store = data;
        self.text = data.description;
        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });
        self.storeService.addStore(data);

        self.storeService.pageView({
          pageType: 'store',
          viewTime: new Date().getTime(),
          storeId: data.id
        });
        self.queryProduct();
      }
    });
  }

  queryProduct(clearProduct?: boolean) {
  }

  jumpProductList(): void {
    this.router.navigate([`/shop/store/templates/preview/2/list`]);
  }
}
