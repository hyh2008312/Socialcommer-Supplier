import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-5-about',
  templateUrl: './about.component.html',
  styleUrls: ['../_store-template-5.scss']
})

export class aboutComponent implements OnInit {
  public shareLink: string;
  public text = '';
  store: Store = new Store();
  contextList: any = {};
  ownerFirstName: string;
  ownerLastName: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }

  ngOnInit(): void {
    this.shareLink = window.location.href;

    let self = this;

    this.storeService.store.subscribe((data) => {
      if (data) {
        self.store = data;
        self.contextList = data.context ? data.context : {};
        self.text = data.description;
        self.ownerFirstName = data.ownerFirstName;
        self.ownerLastName = data.ownerLastName;
        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });
      }
    });
  }
}
