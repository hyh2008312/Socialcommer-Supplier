import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response} from "@angular/http";

import 'rxjs/add/operator/toPromise';

import { BaseApi } from '../../../config/app.api';
import { AuthenticationService } from '../../services/authentication/authentication.service';


interface UploadFile {
  type: string;
  fileName: string;
  use: string;
  width: number;
  height: number;
}

@Injectable()
export class S3UploaderService {

  constructor(
    private http: Http,
    private baseUrl: BaseApi,
    private auth: AuthenticationService
  ) {
  }

  createAuthorizationHeader(headers: Headers) {

    this.auth.getAccessToken().subscribe((data) => {
      if(data) {
        headers.append('Authorization', 'Bearer ' + data);
      }
    });

  }

  private getTokenPostOptions(): RequestOptions {

    let headers = new Headers({ 'Content-Type': 'multipart/form-data; charset=UTF-8' });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({ headers: headers });

    return options;
  }

  private getPostOptions(): RequestOptions {

    let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({ headers: headers });

    return options;
  }

  upload(file: UploadFile): Promise<any> {

    let _options = this.getPostOptions();
    const url = `${this.baseUrl.url}image/s3policy/`;

    return this.http.post(url, file, _options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  uploadToS3(file: any, postParams: any): Promise<any> {

    let formData = new FormData();

    formData.append('acl',  postParams.acl);
    formData.append('Content-Type', postParams['Content-Type']);
    formData.append('x-amz-date', postParams['x-amz-date']);
    formData.append('x-amz-algorithm', postParams['x-amz-algorithm']);
    formData.append('x-amz-credential', postParams['x-amz-credential']);
    formData.append('x-amz-signature', postParams['x-amz-signature']);
    formData.append('policy', postParams.policy);
    formData.append('key', postParams.key);
    formData.append('file', file);

    let _options = this.getTokenPostOptions();

    return this.http.post(postParams.url, formData, _options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.msg ? error.msg : error.toString();
    }
    return Promise.reject(errMsg);
  }
}
