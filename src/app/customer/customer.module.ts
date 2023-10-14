import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

@NgModule({
  declarations: [CustomerListComponent, CustomerAddComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [CustomerListComponent, CustomerAddComponent],
})
export class CustomerModule {}
