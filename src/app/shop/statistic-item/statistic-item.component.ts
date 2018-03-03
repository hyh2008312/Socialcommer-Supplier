import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-statistic-item',
  templateUrl: './statistic-item.component.html',
  styleUrls: ['../shop.scss']
})

export class StatisticItemComponent implements OnInit {

  @Input() index: any = 0;
  @Input() data: any = null;

  constructor(

  ) { }

  ngOnInit(): void {

  }

}
