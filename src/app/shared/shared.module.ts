import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule }    from '@angular/flex-layout';
import { MomentModule }        from 'angular2-moment';

import { SafeHtmlPipe }         from './pipes/safe-html/safe-html.pipe';
import { SafeUrlPipe }         from './pipes/safe-url/safe-url.pipe';
import { SaleDiscountPipe }         from './pipes/sale-discount/sale-discount.pipe';
import { FormatCurrencyPipe }         from './pipes/format-currency/format-currency.pipe';
import { ExchangeCurrencyPipe }  from './pipes/exchange-currency/exchange-currency.pipe';

import { ViewResizeDirective }  from './directives/view-resize/view-resize.directive';
import { ViewScrollDirective }  from './directives/view-srcoll/view-scroll.directive';
import { ViewObjectScrollDirective }  from './directives/view-object-srcoll/view-object-scroll.directive';
import { RepeatOrderDirective }  from './directives/repeat-order/repeat-order.directive';
import { SocialShareDirective }  from './directives/social-share/social-share.directive';
import { ValidateEqualDirective }  from './directives/validate-equal/validate-equal.directive';

import { ImageUploadPreviewComponent } from './components/image-upload-preview/image-upload-preview.component';
import { ImageUploadPreviewMultiComponent } from './components/image-upload-preview-multi/image-upload-preview-multi.component';
import { ImagePreviewMultiComponent } from './components/image-preview-multi/image-preview-multi.component';
import { ImageUploadHeaderComponent } from './components/image-upload-header/image-upload-header.component';
import { ImageUploadPreviewBlogComponent } from './components/image-upload-preview-blog/image-upload-preview-blog.component';
import { ImagePreviewLoadingComponent } from './components/image-preview-loading/image-preview-loading.component';
import { LeftProductsImageComponent } from './components/left-products-image/left-products-image.component';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { BottomFooterComponent } from './components/bottom-footer/bottom-footer.component';

import { ImageUploadPreviewService } from './components/image-upload-preview/image-upload-preview.service';
import { ConstantService } from './services/constant/constant.service';
import { S3UploaderService } from './services/s3-upload/s3-upload.service';

import { QuillEditorModule } from 'ngx-quill-editor';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { CarouselModule } from './components/angular4-carousel/index';

import { LoginDialogComponent } from '../login/login/login-dialog.component';
import { SignUpDialogComponent } from '../login/sign-up/sign-up-dialog.component';
import { ResetPasswordComponent } from '../login/reset-password/reset-password.component';
import { ResetPasswordConfirmComponent } from '../login/reset-password-confirm/reset-password-confirm.component';
import { InviteCodeComponent } from "../login/invite-code/invite-code.component";

import { LoginService } from '../login/login.service';

import { Angular2SocialLoginModule } from "angular2-social-login";

import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatTabsModule,
  MatDialogModule,
  MatChipsModule,
  MatIconModule,
  MatSortModule,
  MatRadioModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatProgressBarModule
} from '@angular/material';


import { GoogleClientId, FacebookClientId } from '../config/app.api';
import {ImageUploadPreviewTwoTemplateComponent} from './components/image-upload-preview-two-template/image-upload-preview-two-template.component';
import {ImageUploadPreviewFourTemplateComponent} from './components/image-upload-preview-four-template/image-upload-preview-four-template.component';
import {ViewShareScrollDirective} from './directives/view-share-srcoll/view-share-scroll.directive';
import {ViewScrollTopDirective} from './directives/view-scroll-top/view-scroll-top.directive';
import {ViewModifyBodyStyleDirective} from "./directives/view-modify-body-style/view-modify-body-style.directive";
import {MakeFirstLetterBigPipe} from 'app/shared/pipes/make-first-letter-big/make-first-letter-big.pipe';

let providers = {
  "google": {
    "clientId": GoogleClientId
  },
  "facebook": {
    "clientId": FacebookClientId,
    "apiVersion": "v2.10"
  }
};

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    QuillEditorModule,
    AngularCropperjsModule,
    CarouselModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTabsModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSnackBarModule,
    Angular2SocialLoginModule,
    MatSidenavModule,
    MatProgressBarModule
  ],
  declarations: [
    SafeHtmlPipe,
    SaleDiscountPipe,
    SafeUrlPipe,
    FormatCurrencyPipe,
    MakeFirstLetterBigPipe,
    ExchangeCurrencyPipe,
    ViewResizeDirective,
    ViewScrollDirective,
    ViewObjectScrollDirective,
    RepeatOrderDirective,
    SocialShareDirective,
    ValidateEqualDirective,
    ViewShareScrollDirective,
    ViewScrollTopDirective,
    ViewModifyBodyStyleDirective,
    ImageUploadPreviewComponent,
    ImageUploadPreviewMultiComponent,
    ImagePreviewMultiComponent,
    ImageUploadHeaderComponent,
    ImagePreviewLoadingComponent,
    ImageUploadPreviewBlogComponent,
    LeftProductsImageComponent,
    NavigationHeaderComponent,
    BottomFooterComponent,
    LoginDialogComponent,
    SignUpDialogComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmComponent,
    InviteCodeComponent,
    ImageUploadPreviewTwoTemplateComponent,
    ImageUploadPreviewFourTemplateComponent


  ],
  exports: [
    SafeHtmlPipe,
    SaleDiscountPipe,
    SafeUrlPipe,
    FormatCurrencyPipe,
    MakeFirstLetterBigPipe,
    ExchangeCurrencyPipe,
    ViewResizeDirective,
    ViewScrollDirective,
    ViewObjectScrollDirective,
    RepeatOrderDirective,
    ViewShareScrollDirective,
    ViewScrollTopDirective,
    SocialShareDirective,
    ValidateEqualDirective,
    ViewModifyBodyStyleDirective,
    ImageUploadPreviewComponent,
    ImageUploadPreviewMultiComponent,
    ImagePreviewMultiComponent,
    ImageUploadHeaderComponent,
    ImagePreviewLoadingComponent,
    ImageUploadPreviewBlogComponent,
    ImageUploadPreviewTwoTemplateComponent,
    ImageUploadPreviewFourTemplateComponent,
    LeftProductsImageComponent,
    NavigationHeaderComponent,
    BottomFooterComponent,
    LoginDialogComponent,
    SignUpDialogComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmComponent,
    InviteCodeComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    QuillEditorModule,
    AngularCropperjsModule,
    MomentModule,
    CarouselModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTabsModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatSortModule,
    MatRadioModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatProgressBarModule
  ],
  providers: [
    ImageUploadPreviewService,
    ConstantService,
    S3UploaderService,
    LoginService
  ],
  entryComponents: [
    LoginDialogComponent,
    SignUpDialogComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmComponent,
    InviteCodeComponent
  ]
})
export class SharedModule { }
Angular2SocialLoginModule.loadProvidersScripts(providers);
