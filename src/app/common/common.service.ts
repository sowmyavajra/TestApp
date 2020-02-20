import { Injectable, OnInit } from "@angular/core";
import { ExpiryMonthAndYear, Payment, CardExpiryMonthAndYear } from "./models";
import { DatePipe } from "@angular/common"
@Injectable({
  providedIn: "root"
})
export class CommonService implements OnInit {

  currentUrl: string;

  ngOnInit() {

    this._currentDate = this.datepipe.transform(this._currentDate,'yyyy-MM-dd')
  }
  _cardExpiryMonthAndYear : CardExpiryMonthAndYear = new CardExpiryMonthAndYear();

  _cardExpiryMonths: ExpiryMonthAndYear[];
  _cardExpiryYears: ExpiryMonthAndYear[];
  _payment: Payment = new Payment();
  _currentDate:any = new Date;

  constructor(private datepipe :DatePipe) {}

  // Generate Expiry month list
  GenerateExpiryData(selectedYear: string) :CardExpiryMonthAndYear {
    debugger;
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
          let selectedMonthExists = this._cardExpiryMonths.find(
            i => i.Expiry == this._payment.CardPaymentDetails.CardExpMonth
          );
          if (selectedMonthExists == undefined) {
            this._payment.CardPaymentDetails.CardExpMonth = "";
          }
        } else if (currentYear < parseInt(selectedYear)) {
          for (var monthIndex = 0; monthIndex < 12; monthIndex++) {
            let expiryMonthData: ExpiryMonthAndYear = new ExpiryMonthAndYear();
            expiryMonthData.Expiry = String(startingMonth + monthIndex);
            if (expiryMonthData.Expiry.length == 1) {
              expiryMonthData.Expiry = "0" + expiryMonthData.Expiry;
            }
            this._cardExpiryMonths.push(expiryMonthData);
          }
        }
      } else {
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
      for (
        var yearIndex = currentYear;
        yearIndex < currentYear + 15;
        yearIndex++
      ) {
        let expiryYearData: ExpiryMonthAndYear = new ExpiryMonthAndYear();
        expiryYearData.Expiry = String(yearIndex - 1 + 1);
        this._cardExpiryYears.push(expiryYearData);
        console.log(this._cardExpiryYears);
        this._cardExpiryMonthAndYear.CardExpiryMonths=this._cardExpiryMonths;
        this._cardExpiryMonthAndYear.CardExpiryYears = this._cardExpiryYears;
        return this._cardExpiryMonthAndYear;
      }
    }
  }
}
