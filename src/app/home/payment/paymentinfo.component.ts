import { Component, OnInit } from '@angular/core';
import { Payment, CardType, ExpiryMonthAndYear,CardExpiryMonthAndYear } from 'src/app/common/models';
import { Service } from 'src/app/common/service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-paymentinfo',
  templateUrl: './paymentinfo.component.html',
  styleUrls: ['./paymentinfo.component.scss']
})
export class PaymentinfoComponent implements OnInit {
  _cardExpiryMonthAndYear : CardExpiryMonthAndYear = new CardExpiryMonthAndYear();
  _payment: Payment = new Payment();
  _displayErrorForPaymentMethod: boolean = false;
  _loading: boolean = false;
  _activeTab: any = 'B';
  _activeAccountTypeTab: any = '';
  
  _cardTypes: CardType[] = [{ Id: "1", CardType: "V", Description: "VISA" },
  { Id: "2", CardType: "A", Description: "American Express" },
  { Id: "3", CardType: "M", Description: "Master Card" },
  { Id: "4", CardType: "D", Description: "Discover" }];
  _cardExpiryMonth: string;
  _cardExpiryYear: string;
  

  constructor(private service: Service, private route: Router, private commonService : CommonService) { }

  ngOnInit() {  
    this.GenerateExpiryData("");     
  }
  GenerateExpiryData(year)
  {
    debugger;
   this._cardExpiryMonthAndYear= this.commonService.GenerateExpiryData(year);
   debugger;
  }
  //Logic for swapping class for payment type selected
  Activeclick(clickedTab) {
    //this._errorDetails.length = 0;
    this._payment.PaymentType = clickedTab;
    this._activeTab = clickedTab;
    this._displayErrorForPaymentMethod = false;
  }
  //Logic for swapping class for account type selected
  ActiveAccountTypeclick(clickedAccountType) {
    this._payment.BankDraftDetails.AccountType = clickedAccountType;
    this._activeAccountTypeTab = clickedAccountType;
  }
  
  SavePaymentInfo(form: any) {
    if (this.Save(form)) {
      this._loading = true;
      this.route.navigate(["/member-info"]);
    }
  }
  GoToLogin() {

  }
  Save(form: any): boolean {
    if (!form.valid) {
      this.service.ValidateAllFormFields(form);
      this._loading = false;
      return false;
    }
    return true;
  }
}

