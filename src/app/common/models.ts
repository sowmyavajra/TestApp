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
  //Model class for expiry month
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