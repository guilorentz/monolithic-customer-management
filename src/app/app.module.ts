import { OrderEffects } from './order/store/order/order.effects';
import { AppEffects } from './common/app.effects';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomerModule } from './customer/customer.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CustomerReducer } from './customer/store/customer/customer.reducers';
import { CustomerEffects } from './customer/store/customer/customer.effects';
import { ProductModule } from './product/product.module';
import { ProductEffects } from './product/store/product/product.effects';
import { ProductReducer } from './product/store/product/product.reducers';
import { OrderModule } from './order/order.module';
import { OrderReducer } from './order/store/order/order.reducers';
import { NavbarComponent } from './common/components/navbar/navbar.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomerModule,
    ProductModule,
    OrderModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      customer: CustomerReducer,
      order: OrderReducer,
      product: ProductReducer,
    }),
    EffectsModule.forRoot([
      AppEffects,
      CustomerEffects,
      OrderEffects,
      ProductEffects,
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
