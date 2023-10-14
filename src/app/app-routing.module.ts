import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer/components/customer-list/customer-list.component';
import { ProductListComponent } from './product/components/product-list/product-list.component';

const routes: Routes = [
  {
    path: 'customers',
    component: CustomerListComponent,
  },
  { path: '', component: ProductListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
