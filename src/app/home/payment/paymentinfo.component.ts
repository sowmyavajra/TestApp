import { Component, OnInit } from '@angular/core';
import { Payment, ExpiryMonthAndYear, CardType } from 'src/app/common/models';
import { Service } from 'src/app/common/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentinfo',
  templateUrl: './paymentinfo.component.html',
  styleUrls: ['./paymentinfo.component.scss']
})
export class PaymentinfoComponent implements OnInit {
  _payment: Payment = new Payment();
  _displayErrorForPaymentMethod: boolean = false;
  _loading: boolean = false;
  _activeTab: any = 'B';
  _activeAccountTypeTab: any = '';
  _cardExpiryMonths: ExpiryMonthAndYear[];
  _cardExpiryYears: ExpiryMonthAndYear[];
  _cardTypes: CardType[] = [{ Id: "1", CardType: "V", Description: "VISA" },
  { Id: "2", CardType: "A", Description: "American Express" },
  { Id: "3", CardType: "M", Description: "Master Card" },
  { Id: "4", CardType: "D", Description: "Discover" }];
  _cardExpiryMonth: string;
  _cardExpiryYear: string;
  _currentDate: string;
  constructor(private service: Service, private route: Router) { }
  async ngOnInit() {
    this._currentDate = '01/01/2020';
    await this.GenerateExpiryData("");
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
  // Generate Expiry month list
  async GenerateExpiryData(selectedYear: string) {
    console.log(selectedYear);
    this._cardExpiryMonths = new Array();
    this._cardExpiryYears = new Array();
    console.log(this._currentDate);
    if (this._currentDate != undefined && this._currentDate.length != 0) {
      let startingMonth = 1;
      let date = new Date(this._currentDate);
      let currentMonth = date.getMonth();
      let currentYear = date.getFullYear();
      if (selectedYear != undefined && selectedYear.length != 0) {
        console.log(selectedYear);
        if (currentYear == parseInt(selectedYear)) {
          for (var monthIndex = currentMonth; monthIndex < 12; monthIndex++) {
            let expiryMonthData: ExpiryMonthAndYear = new ExpiryMonthAndYear();
            expiryMonthData.Expiry = String(startingMonth + monthIndex);
            if (expiryMonthData.Expiry.length == 1) {
              expiryMonthData.Expiry = "0" + expiryMonthData.Expiry;
            }
            this._cardExpiryMonths.push(expiryMonthData);
          }
          let selectedMonthExists = this._cardExpiryMonths.find(i => i.Expiry == this._payment.CardPaymentDetails.CardExpMonth);
          if (selectedMonthExists == undefined) {
            this._payment.CardPaymentDetails.CardExpMonth = '';
          }
        }
        else if (currentYear < parseInt(selectedYear)) {
          for (var monthIndex = 0; monthIndex < 12; monthIndex++) {
            let expiryMonthData: ExpiryMonthAndYear = new ExpiryMonthAndYear();
            expiryMonthData.Expiry = String(startingMonth + monthIndex);
            if (expiryMonthData.Expiry.length == 1) {
              expiryMonthData.Expiry = "0" + expiryMonthData.Expiry;
            }
            this._cardExpiryMonths.push(expiryMonthData);
          }
        }
      }
      else {
        for (var monthIndex = 0; monthIndex < 12; monthIndex++) {
          let expiryMonthData: ExpiryMonthAndYear = new ExpiryMonthAndYear();
          expiryMonthData.Expiry = String(startingMonth + monthIndex);
          if (expiryMonthData.Expiry.length == 1) {
            expiryMonthData.Expiry = "0" + expiryMonthData.Expiry;
          }
          this._cardExpiryMonths.push(expiryMonthData);
          console.log(this._cardExpiryMonths);
        }
      }
      for (var yearIndex = currentYear; yearIndex < currentYear + 15; yearIndex++) {
        let expiryYearData: ExpiryMonthAndYear = new ExpiryMonthAndYear();
        expiryYearData.Expiry = String((yearIndex - 1) + 1);
        this._cardExpiryYears.push(expiryYearData);
        console.log(this._cardExpiryYears);

      }
    }
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

