export class Login {
Email: string="";
Password: string="";
}
export class Payment{
    PaymentType:string="";
    CardPaymentDetails:CardPayment;
    BankDraftDetails:BankDraftPayment;
    constructor(){
        this.CardPaymentDetails=new CardPayment();
        this.BankDraftDetails=new BankDraftPayment();
    }
}
export class CardPayment{
    CardHolderName:string="";
    CardType:string="";
    CardNumber:string="";
    CardExpMonth:string="";
    CardExpYear:string="";
}
export class BankDraftPayment{
    NameOnAccount:string="";
    BankName:string="";
    RoutingNumber:string="";
    AccountNumber:string="";
    AccountType:string="";
}
//Model calss to hold card type
export class CardType {
    Id: string;
    CardType: string;
    Description: string;
  }

  //Model class for expiry month and year
export class CardExpiryMonthAndYear
{
    CardExpiryMonths :ExpiryMonthAndYear[];
    CardExpiryYears :ExpiryMonthAndYear[];
}
  
export class ExpiryMonthAndYear {
    Expiry: string = '';
  }

export class Register{    
    Email:string ="";
    Password:string="";    
}
//Class to retain data between pages
export class FormDataModel {
    Register:Register;
}

export class LYPayment
{
    PaymMthdType:string;
    CardDetails : CardDetails;
    BankDraftDetails : BankDraftDetails;
    /**
     *
     */
    constructor() {
        this.CardDetails=new CardDetails();
        this.BankDraftDetails=new BankDraftDetails();
        
    }
}
export class CardDetails
{
    CardFirstName :string;
    CardLastName: string;
    CardNum : string;
    CardExpMonth:string;
    CardExpYear:string;
    CardType:string;
    CardLastFour:string;

}
 export class BankDraftDetails
 {
    ACHFirstName:string;
    ACHLastName:string;
    FinInstName:string;
    RoutingNum:string;
    ActNum:string;
    ActType:string;
 }

 export class BillingAddress
 {
    Address : string;
    Address2:string;
    DOB :string;
 }