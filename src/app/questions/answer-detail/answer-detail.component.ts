import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Questions, Owner, Userprofile, CurrentUser} from '../questions';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.scss']
})

export class AnswerDetailComponent implements OnInit {

  answer : Questions = new Questions();
  owner : Owner = new Owner();
  userprofile: Userprofile = new Userprofile();
  currentUser: CurrentUser = new CurrentUser();

  constructor(
    private questionsService: QuestionsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit():void {

    let id = this.route.snapshot.params['id'];
    this.questionsService.getAnswerDetail(id).then(answer => {
      this.answer = answer;
      this.owner = answer.owner;
      this.userprofile = answer.owner.userprofile;
      if(answer.owner.currentUser == null) {
        this.currentUser = {
          follow: false
        };
      } else {
        this.currentUser = answer.owner.currentUser;
      }

      return this;
    });

  }

  toProfile(id:number) {
    if(window['WebAppInterface']) {
      window['WebAppInterface'].toProfile(id);
    }
  }
}