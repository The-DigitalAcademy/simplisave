import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.css']
})
export class OnBoardingComponent {
constructor(private router:Router){}

continue(){
  this.router.navigate(['/nextStep']);
}

skip(){
  this.router.navigate(['/main']);
}
}
