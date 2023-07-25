import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-getstarted',
  templateUrl: './landing-getstarted.component.html',
  styleUrls: ['./landing-getstarted.component.css']
})
export class LandingGetstartedComponent {

  constructor(private router: Router) {}

  navigateToLearnComponent(): void {
    this.router.navigateByUrl('/learn');
  }
}
