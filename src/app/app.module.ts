import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { MemberInfoComponent } from './home/member-info/member-info.component';
import { PaymentinfoComponent } from './home/payment/paymentinfo.component';
import { RegisterComponent } from './register/register.component';
import { LYPaymentComponent } from './home/LYPayment/LYPayment.component';

import { HttpRequestResponseInterceptor } from './common/http-request-response-interceptor';
import { MatTabsModule,MatDatepickerModule,MatFormFieldModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { DatePipe } from '@angular/common';


@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      LoginComponent,
      MemberInfoComponent,
      PaymentinfoComponent,
      RegisterComponent,
      LYPaymentComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      HttpClientModule,     
      NgxLoadingModule.forRoot({
         animationType: ngxLoadingAnimationTypes.wanderingCubes,
         backdropBackgroundColour: 'rgba(0,0,0,0.1)',
         backdropBorderRadius: '4px',
         primaryColour: '#7D3F98',
         secondaryColour: '#d20962',
         tertiaryColour: '#ffffff'
       }),
      BrowserAnimationsModule,
      MatSliderModule,
      MatTabsModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatNativeDateModule,
      MatInputModule,
  ],
  exports:[MatDatepickerModule,MatFormFieldModule,MatNativeDateModule],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: HttpRequestResponseInterceptor, multi: true },DatePipe,MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
