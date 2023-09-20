import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirstTimeUserService } from 'src/app/services/first-time-user.service';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.css']
})
export class OnBoardingComponent {
constructor(private router:Router , private firstTimeUser:FirstTimeUserService){

}

continue(){
  this.router.navigate(['/add']);
  
}

skip(){
  
  this.router.navigate(['/dashboard']);
}
}
