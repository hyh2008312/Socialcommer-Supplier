import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AdminService} from '../admin.service';
import {UserService} from '../../shared/services/user/user.service';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['../_admin.scss']
})

export class ShopComponent implements OnInit {

  avatar: any = false;
  firstName: any = '';
  storeName: any = false;
  isPopOpen: boolean = false;

  constructor(private userService: UserService,
              private adminService: AdminService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    let self = this;
    self.userService.currentUser.subscribe((data) => {
      if (data) {
        self.avatar = data.avatar;
        self.firstName = data.firstName;
      }
    });
  }

  ngOnInit(): void {
    let self = this;

  }

  openPop() {
    this.isPopOpen = !this.isPopOpen;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/account/login']);
  }

}
