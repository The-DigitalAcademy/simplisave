/* eslint-disable prettier/prettier */
import { Component } from '@angular/core';

@Component({
  selector: 'app-accounts-savings-and-investments',
  templateUrl: './accounts-savings-and-investments.component.html',
  styleUrls: ['./accounts-savings-and-investments.component.css']
})
export class AccountsSavingsAndInvestmentsComponent {

  //Responsible to route to tax free page on absa page for more information
  //Lebohang Mokoena
  //2023/08/18
  redirectToTaxFreePage(): void {
    const externalUrl = 'https://www.absa.co.za/personal/save-invest/products/absa-tax-free-savings-account/?cmpid=SGOOGL_wrWbd&gad=1&gclid=Cj0KCQjw8NilBhDOARIsAHzpbLCdK_DzqhYpCmSlW9dk2oa6Q9PGSBWkuYoi6Bn2ChFgBJO0xCyffAMaAinuEALw_wcB';
    window.open(externalUrl, '_blank');
  }

  //Responsible to route to easy access page on absa page for more information
  //Lebohang Mokoena
  //2023/08/18
  redirectToEasyAccessPage(): void {
    const externalUrl = 'https://www.absa.co.za/personal/save-invest/products/absa-trusave/';
    window.open(externalUrl, '_blank');
  }

  //Responsible to route to tsavings plan page on absa page for more information
  //Lebohang Mokoena
  //2023/08/18
  redirectToSavingsPlanPage(): void {
    const externalUrl = 'https://www.absa.co.za/personal/save-invest/products/futureplan/';
    window.open(externalUrl, '_blank');
  }

  //Responsible to route to notice deposit page on absa page for more information
  //Lebohang Mokoena
  //2023/08/18
  redirectToNoticeDepositPage(): void {
    const externalUrl = 'https://www.absa.co.za/business/saving-and-investing/notice-deposits/';
    window.open(externalUrl, '_blank');
  }

  //Responsible to route to unit trust page on absa page for more information
  //Lebohang Mokoena
  //2023/08/18
  redirectToUnitTrustPage(): void {
    const externalUrl = 'https://www.absa.co.za/personal/save-invest/products/absa-income-enhancer-fund/';
    window.open(externalUrl, '_blank');
  }
}
