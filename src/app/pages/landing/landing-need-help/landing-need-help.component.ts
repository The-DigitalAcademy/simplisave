import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-need-help',
  templateUrl: './landing-need-help.component.html',
  styleUrls: ['./landing-need-help.component.css']
})
export class LandingNeedHelpComponent {
  constructor(private router: Router) {}

  navigateToLearnComponent(): void {
    this.router.navigateByUrl('/learn');
  }
}
