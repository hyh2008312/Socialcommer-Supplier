import {NgModule} from '@angular/core';

import {AccountRoutingModule} from './account.routes.module';
import {SharedModule} from '../../shared/shared.module';
import {AccountService} from "./account.service";
import {AccountItemComponent} from "./account-item/account-item.component";
import {AccountMainComponent} from "./account-main/account-main.component";

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  exports: [],
  declarations: [
    AccountItemComponent,
    AccountMainComponent

  ],
  entryComponents: [],
  providers: [AccountService]
})
export class AccountModule {
}

