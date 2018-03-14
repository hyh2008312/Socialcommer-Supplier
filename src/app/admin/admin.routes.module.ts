import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ShopComponent} from './shop/shop.component';
import {ShopErrorComponent} from './shop-error/shop-error.component';

const routes: Routes = [
  {
    path: '', component: ShopComponent,
    children: [
      {
        path: 'accounts',
        loadChildren: 'app/admin/account/account.module#AccountModule'
      }, {
        path: 'error', component: ShopErrorComponent
      }, {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }, {
        path: '**',
        redirectTo: 'error',
        pathMatch: 'full'
      }
    ]
  }, {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
