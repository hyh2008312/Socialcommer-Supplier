import { NgModule } from '@angular/core';
import { ShopComponent } from './shop/shop.component';
import { ShopErrorComponent } from './shop-error/shop-error.component';

import { LeftSideNavigationComponent } from "./left-side-navigation/left-side-navigation.component";
import { StoreAvatarComponent } from "./store-avatar/store-avatar.component";

import { AdminRoutingModule } from './admin.routes.module';

import { AdminService } from './admin.service';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  exports: [],
  declarations: [
    ShopComponent,
    ShopErrorComponent,
    LeftSideNavigationComponent,
    StoreAvatarComponent
  ],
  entryComponents: [

  ],
  providers: [
    AdminService,
    AuthenticationService
  ]
})
export class AdminModule { }

