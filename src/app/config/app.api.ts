import { environment } from '../../environments/environment';

export class BaseApi{
  url: string;

  constructor(){
    this.url = 'https://api-staging.xberts.com/';
    if(environment.production) {
      this.url = 'https://api.xberts.com/';
    }

  }
}