import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { LoginComponent } from './login/login.component';
import{FormsModule} from '@angular/forms';
import { MemberInfoComponent } from './home/member-info/member-info.component';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,      
      FooterComponent,
      LoginComponent,
      MemberInfoComponent
     
   ],
   imports:[
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      NgxLoadingModule.forRoot({
         animationType: ngxLoadingAnimationTypes.wanderingCubes,
         backdropBackgroundColour: 'rgba(0,0,0,0.1)',
         backdropBorderRadius: '4px',
         primaryColour: '#7D3F98',
         secondaryColour: '#d20962',
         tertiaryColour: '#ffffff'
       })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
