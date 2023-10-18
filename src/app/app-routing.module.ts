import { OrderListComponent } from './order/components/order-list/order-list.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer/components/customer-list/customer-list.component';
import { ProductListComponent } from './product/components/product-list/product-list.component';

const routes: Routes = [
  { path: '', component: OrderListComponent },
  {
    path: 'customers',
    component: CustomerListComponent,
  },
  { path: 'products', component: ProductListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
