import { NgModule } from '@angular/core';
import { routes } from './app.routes';
import { environment } from '../environments/environments';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

// Component Import
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductsModule } from './products/products.module';
import { HomeComponent } from './home/home.component';
import { AuthService } from './shared/services/auth.service';
import { IconModule } from './shared/icons/icons.module';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './user/dashboard/products/products.component';
import { AccountComponent } from './user/dashboard/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    DashboardComponent,
    ProductsComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    FormsModule,
    IconModule,
    SharedModule,
    ProductsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
