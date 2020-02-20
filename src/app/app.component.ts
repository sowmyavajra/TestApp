import { Component } from '@angular/core';
import { CommonService } from './common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PaymentAngular';
  public _loading = false;

  constructor(public router: Router) { }

  ngOnInit() {
    
  }
}
