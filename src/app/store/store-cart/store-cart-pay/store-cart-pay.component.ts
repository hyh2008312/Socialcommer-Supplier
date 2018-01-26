import { Component, OnInit, OnDestroy, OnChanges, NgZone, ChangeDetectorRef} from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StoreService } from '../../store.service';
import { StoreCartService } from '../store-cart.service';
import { ConstantService } from  '../../../shared/services/constant/constant.service';

@Component({
  selector: 'app-store-cart-pay',
  templateUrl: './store-cart-pay.component.html',
  styleUrls: ['../store-cart.scss']
})

export class StoreCartPayComponent implements OnInit{

  storeId: number = 0;

  order: any;

  step = 0;

  stepOneForm : FormGroup;
  stepTwoForm : FormGroup;

  homeLink:string = '';

  isTotalDialogOpen: boolean = false;

  countries: any;

  states: any;

  statesBilling: any;

  displayName: string = '';

  payMethod: string = 'Credit Card';

  payMethodItem = {
    content: 'Credit Card',
    display: true
  };

  payMethodList = [{
    content: 'Credit Card',
    display: true
  }];

  shippingMethod: string = 'Same as shipping address';

  shippingMethodItem = {
    content: 'Same as shipping address',
    display: false
  };

  shippingMethodList = [{
    content: 'Same as shipping address',
    display: false
  }, {
    content: 'Use a different billing address',
    display: true
  }];

  cardNumber: any;
  expiryDate: any = '';
  cvc: any;
  cardMessage: any = false;

  stripeToken: string = '';

  cartLink: string = '';

  shippingAddressList: any;

  products: any;

  subTotalPrice: number = 0;
  shippingTotalPrice: number = 0;
  totalPrice: number = 0;

  constructor(
    overlayContainer: OverlayContainer,
    private storeService: StoreService,
    private storeCartService: StoreCartService,
    private constant: ConstantService,
    private fb: FormBuilder,
    private changeDetectorRef:ChangeDetectorRef
  ) {
    if((<any>window).Stripe) {
      (<any>window).Stripe.setPublishableKey('pk_test_4moMjkGVqC9OkgfZAzkotlZn');
    }

    this.storeService.store.subscribe((data) => {
      if(data) {
        this.storeId = data.id;
      }
    });

    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');

    this.storeCartService.getCountryList().then((data) => {
      this.countries = data;
    });

    this.stepOneForm = this.fb.group({
      isSaveAddress: [true],
      emailAddress: ['', [
        Validators.required
      ]],
      confirmEmail: ['', [
        Validators.required
      ]],
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      line1: ['', [
        Validators.required
      ]],
      line2: [''],
      city: ['', [
        Validators.required
      ]],
      countryId: ['', [
        Validators.required
      ]],
      stateId: ['', [
        Validators.required
      ]],
      postcode: ['', [
        Validators.required
      ]],
      phoneNumber: ['', [
        Validators.required
      ]]
    });

    this.stepTwoForm = this.fb.group({
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      line1: ['', [
        Validators.required
      ]],
      line2: [''],
      city: ['', [
        Validators.required
      ]],
      countryId: ['', [
        Validators.required
      ]],
      stateId: ['', [
        Validators.required
      ]],
      postcode: ['', [
        Validators.required
      ]]
    });

    this.stepOneForm.valueChanges.subscribe(data => this.onValueChanged(data, this.stepOneForm));

    this.stepTwoForm.valueChanges.subscribe(data => this.onValueChanged(data, this.stepTwoForm));

    this.order = this.storeCartService.getOrder();
    this.products = this.order.lines;
    this.calculatePrice();

    this.shippingAddressList = this.storeCartService.getShippingAddress();

    this.stepOneForm.patchValue({
      isSaveAddress: this.shippingAddressList.isSaveAddress
    });

    if(this.order.shippingAddress) {
      this.stepOneForm.patchValue({
        emailAddress: this.order.emailAddress,
        confirmEmail: this.order.emailAddress,
        firstName: this.order.shippingAddress.firstName,
        lastName: this.order.shippingAddress.lastName,
        line1: this.order.shippingAddress.line1,
        line2: this.order.shippingAddress.line2,
        city: this.order.shippingAddress.city,
        countryId: this.order.shippingAddress.country.id,
        stateId: this.order.shippingAddress.state.id,
        postcode: this.order.shippingAddress.postcode,
        phoneNumber: this.order.shippingAddress.phoneNumber,
      });
      this.stepTwoForm.setValue({
        firstName: this.order.shippingAddress.firstName,
        lastName: this.order.shippingAddress.lastName,
        line1: this.order.shippingAddress.line1,
        line2: this.order.shippingAddress.line2,
        city: this.order.shippingAddress.city,
        countryId: this.order.shippingAddress.country.id,
        stateId: this.order.shippingAddress.state.id,
        postcode: this.order.shippingAddress.postcode
      });
      this.changeBillingState(this.order.shippingAddress.country.id);
      this.changeShippingState(this.order.shippingAddress.country.id);
      if(this.order.shippingAddress.id) {
        this.step = 1;
      }
      return;
    }

    if(this.shippingAddressList.id && this.shippingAddressList.isSaveAddress) {
      this.stepOneForm.patchValue({
        emailAddress: this.shippingAddressList.emailAddress,
        confirmEmail: this.shippingAddressList.emailAddress,
        firstName: this.shippingAddressList.firstName,
        lastName: this.shippingAddressList.lastName,
        line1: this.shippingAddressList.line1,
        line2: this.shippingAddressList.line2,
        city: this.shippingAddressList.city,
        countryId: this.shippingAddressList.country.id,
        stateId: this.shippingAddressList.state.id,
        postcode: this.shippingAddressList.postcode,
        phoneNumber: this.shippingAddressList.phoneNumber,
      });
      this.changeShippingState(this.shippingAddressList.country.id);
    }

  }

  //存储错误信息
  formErrors = {
    'emailAddress': '',
    'confirmEmail': '',
    'firstName': '',
    'lastName': '',
    'line1': '',
    'city': '',
    'countryId': '',
    'stateId': '',
    'postcode': '',
    'phoneNumber': ''
  };
  //错误对应的提示
  validationMessages = {
    'emailAddress': {
      'required': 'This field is required.',
    },
    'confirmEmail': {
      'required': 'This field is required.',
      'validateEqual': 'Email does not match the Confirm Email.'
    },
    'firstName': {
      'required': 'This field is required.',
    },
    'lastName': {
      'required': 'This field is required.',
    },
    'line1': {
      'required': 'This field is required.',
    },
    'city': {
      'required': 'This field is required.',
    },
    'countryId': {
      'required': 'This field is required.',
    },
    'stateId': {
      'required': 'This field is required.',
    },
    'postcode': {
      'required': 'This field is required.',
    },
    'phoneNumber': {
      'required': 'This field is required.',
    }
  };

  /**
   * 表单值改变时，重新校验
   * @param data
   */
  onValueChanged(data, form) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = form.get(field);
      //表单字段已修改或无效
      if (control && control.dirty && !control.valid) {
        //取出对应字段可能的错误信息
        const messages = this.validationMessages[field];
        //从errors里取出错误类型，再拼上该错误对应的信息
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '';
          break;
        }
      }

    }

  }

  ngOnInit() {
    let self = this;

    self.storeService.store.subscribe((data) => {
      if(data) {
        let uid = data.templateId == 1? data.templateId:data.uid;
        self.homeLink = `/store/${data.displayName}/${uid}`;
        self.cartLink = `/store/${data.displayName}/cart`;
        self.displayName = data.displayName;
      }
    });
  }

  changePayMethod($event) {
    for(let value of this.payMethodList) {
      if(value.content == $event) {
        this.payMethod = $event;
        this.payMethodItem = value;
        break;
      }
    }
  }

  changeShippingMethod($event) {
    for(let value of this.shippingMethodList) {
      if(value.content == $event) {
        this.shippingMethod = $event;
        this.shippingMethodItem = value;
        break;
      }
    }
    if($event == 'Same as shipping address') {
      this.stepTwoForm.setValue({
        firstName: this.order.shippingAddress.firstName,
        lastName: this.order.shippingAddress.lastName,
        line1: this.order.shippingAddress.line1,
        line2: this.order.shippingAddress.line2,
        city: this.order.shippingAddress.city,
        countryId: this.order.shippingAddress.country.id,
        stateId: this.order.shippingAddress.state.id,
        postcode: this.order.shippingAddress.postcode
      });
      this.changeBillingState(this.order.shippingAddress.country.id);
    }
  }

  changeShippingState($event) {
    let cid = $event;
    this.storeCartService.getStateList({
      cid
    }).then((data)=> {
      this.states = data;
    })
  }

  changeBillingState($event) {
    let cid = $event;
    this.storeCartService.getStateList({
      cid
    }).then((data)=> {
      this.statesBilling = data;
    })
  }

  calculatePrice() {
    let price = 0;
    let shippingPrice = 0;
    for(let item of this.products) {
      if(typeof item.number == 'number' && item.number > 0) {
        price += item.number * item.salePriceAmount;
        if(item.shippingPrice.priceItem) {
          shippingPrice += parseFloat(item.shippingPrice.priceItem) * item.number;
        }
      }
    }

    this.subTotalPrice = price;
    this.shippingTotalPrice = shippingPrice;
    this.totalPrice = this.subTotalPrice + this.shippingTotalPrice;
  }

  continue() {
    if(!this.stepOneForm.valid) {
      return;
    }
    if(this.order.shippingAddress) {
      this.step = 1;
      return;
    }
    let stepOneObject = this.stepOneForm.value;

    let lines = [];
    for(let item of this.products) {
      lines.push({
        goodsId: item.id,
        quantity: item.number,
        variantId: item.variantId,
        shippingPriceId : item.shippingPrice.id
      });
    }

    stepOneObject.storeId = this.storeId;
    stepOneObject.totalInclTax = 0;
    stepOneObject.totalExclTax = 0;
    stepOneObject.shippingInclTax = 0;
    stepOneObject.shippingExclTax = 0;
    stepOneObject.lines = lines;

    let self = this;
    self.storeCartService.createOrder(stepOneObject).then((data) => {
      self.step = 1;
      let lines = self.order.lines;
      self.order = data;
      self.order.lines = lines;
      self.storeCartService.addOrder(self.order);
      let shippingAddress = data.shippingAddress;
      shippingAddress.emailAddress = data.emailAddress;
      if(stepOneObject.isSaveAddress) {
        shippingAddress.isSaveAddress = true;
        self.storeCartService.addShippingAddress(shippingAddress);
      } else {
        shippingAddress.isSaveAddress = false;
        self.storeCartService.addShippingAddress(shippingAddress);
      }

      self.stepTwoForm.setValue({
        firstName: self.order.shippingAddress.firstName,
        lastName: self.order.shippingAddress.lastName,
        line1: self.order.shippingAddress.line1,
        line2: self.order.shippingAddress.line2,
        city: self.order.shippingAddress.city,
        countryId: self.order.shippingAddress.country.id,
        stateId: self.order.shippingAddress.state.id,
        postcode: self.order.shippingAddress.postcode
      });
      self.changeBillingState(self.order.shippingAddress.country.id);
    });
  }

  save() {
    let pattern = /^\d{1,2}\/\d{2}/;
    if(!this.expiryDate.match(pattern)) {
      this.cardMessage = "Your card's expiration year is invalid.";
      return
    }
    let expiryMonth = this.expiryDate.split('/')[0];
    let expiryYear = '';
    if(this.expiryDate.split('/')[1]) {
      expiryYear = this.expiryDate.split('/')[1];
    }

    if(!this.stepTwoForm.valid) {
      return;
    }

    let self = this;

    let order = this.stepTwoForm.value;

    (<any>window).Stripe.card.createToken({
      number: self.cardNumber,
      exp_month: expiryMonth,
      exp_year: expiryYear,
      cvc: self.cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        self.cardMessage = false;
        order.token = response.id;
        order.orderId = self.order.id;
        self.storeCartService.createPayment(order).then((data) => {
          self.step = 2;
          self.order = data;
          self.storeCartService.addOrder({});
          self.storeService.addProductToCart(self.displayName, []);
          self.changeDetectorRef.markForCheck();
          self.changeDetectorRef.detectChanges();
        });
      } else {
        this.cardMessage = response.error.message;
      }
    });
  }

  back() {
    this.step = 0;
  }

  openDialog() {
    this.isTotalDialogOpen = !this.isTotalDialogOpen;
  }

}
