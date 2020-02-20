import { Component, OnInit, ViewChild, ElementRef, Inject } from "@angular/core";
import { Service } from "src/app/common/service";
import { Router } from "@angular/router";
import {
  LYPayment,
  CardType,
  CardExpiryMonthAndYear,
  BillingAddress
} from "src/app/common/models";
import { CommonService } from "src/app/common/common.service";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-LYPayment",
  templateUrl: "./LYPayment.component.html",
  styleUrls: ["./LYPayment.component.css"]
})
export class LYPaymentComponent implements OnInit {
  _cardExpiryMonthAndYear: CardExpiryMonthAndYear = new CardExpiryMonthAndYear();

  _displayErrorForPaymentMethod = false;
  _payment: LYPayment = new LYPayment();
  _loading = false;
  _activeTab: any = "B";
  _activeAccountTypeTab: any = "";  

  // Show Popup
  _showBillngAddressModal = false;
  _billingAddressLoading = false;
  _displayBillngAddressModalError = false;
  _billngAddressErrorDetails: Array<string> = new Array();
  _billingAddress: BillingAddress = new BillingAddress();
  _minDate = new Date("01/01/1900");
  _maxDate = new Date();
  @ViewChild('CardHolderName',{static: false}) CardHolderName: ElementRef;

  _cardTypes: CardType[] = [
    { Id: "1", CardType: "V", Description: "VISA" },
    { Id: "2", CardType: "A", Description: "American Express" },
    { Id: "3", CardType: "M", Description: "Master Card" },
    { Id: "4", CardType: "D", Description: "Discover" }
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private service: Service,
    private route: Router,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.GenerateExpiryData("");
  }
  GenerateExpiryData(year) {
    debugger;
    this._cardExpiryMonthAndYear = this.commonService.GenerateExpiryData(year);
    debugger;
  }
   //Logic for swapping class for payment type selected
   Activeclick(clickedTab) {
     debugger;
    //this._errorDetails.length = 0;

    this._payment.PaymMthdType = clickedTab;
    this._activeTab = clickedTab;
    console.log(this._activeTab);
    this._displayErrorForPaymentMethod = false;
  }
  //Logic for swapping class for account type selected
  ActiveAccountTypeclick(clickedAccountType) {
    this._payment.BankDraftDetails.ActType = clickedAccountType;
    this._activeAccountTypeTab = clickedAccountType;
  }
  SavePaymentInfo(form: any) {  
    debugger;  
    if (this.Save(form)) {
      this._loading = true;
      this.route.navigate(["/member-info"]);
    }
  }
  // mark all controls as touched when form is invalid to show model validation errors
  Save(form: any): boolean {
    if (!form.valid) {
      this._displayErrorForPaymentMethod=true;
      this.service.ValidateAllFormFields(form);
      this._loading = false;
      return false;
    }
    return true;
  }
  OpenBillingAddressPopup() {
    debugger;
    this._displayBillngAddressModalError = false;
    this._showBillngAddressModal = true;
  }
  CloseBillngAddressModal() {
    this._showBillngAddressModal = false;
    let el: HTMLElement = this.CardHolderName.nativeElement as HTMLElement;
    el.focus();
  }
  async BillingAddress(form: any) {
    debugger;
    this._billingAddressLoading = true;
    if (this.BillinAddressIsValid(form)) {
      let billing = this._billingAddress;
      //call api
      await this.service.BillningAddress(billing).then(
        success => {
          if(success["Success"] == "false")
          {
            this._billingAddressLoading = false;
            if (success["Result"] == "Invalid Address.") {
              this._billngAddressErrorDetails.length = 0;
              this._billngAddressErrorDetails.push("Error: Invalid Member.");            
              
            }
            else if (success["ErrorDetails"]["Address"] == "AW2007:Address is Required.") {
            
              this._billngAddressErrorDetails.push("Error: Sorry we could not find the username, please check the information you entered is correct and try again.");
              
            }
          }
          else if (success["Success"] == "true") {
            this._billngAddressErrorDetails.length = 0;           
            this._billngAddressErrorDetails.push("");
            this._billingAddressLoading = false;
          }
        },
        error =>{this._loading = false;
          this._billngAddressErrorDetails.length = 0;
          this._billngAddressErrorDetails.push("Error: Unable to process the request!! Please try again.");
          this._billingAddressLoading = false;}
      )
    }
  }
  BillinAddressIsValid(form: any): Boolean {
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
    if (!form.valid) {
      this.service.ValidateAllFormFields(form);
      this._displayBillngAddressModalError = true;
      this._billingAddressLoading = false;
      return false;
    }
    return true;
  }

  // Date Validation
  ValidateDate(value) {
    debugger;
    if (value.length === 10 && this.service.IsDateValid(value))
      return new Date(value);
    return this._billingAddress.DOB;
  }
  // Prevent tab event when tap is pressed on close btn of modal.
  PreventTabEvent(event: Event) {
    event.preventDefault();
  }
  // On Tab press of send button in Forgot user name, navigate to 1st element in modal. 
  FocusToFirstElementInModal(event: Event, id: string) {
    this.service.FocusToFirstElementInModal(event, id);
  }
}
